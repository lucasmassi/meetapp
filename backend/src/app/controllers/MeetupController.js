import * as Yup from 'yup';
import { startOfHour, parseISO, isBefore, subHours } from 'date-fns';

import Meetup from '../models/Meetup';
import User from '../models/User';
import File from '../models/File';

class MeetupController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const meetups = await Meetup.findAll({
      where: { user_id: req.userId, canceled_at: null },
      order: ['date'],
      limit: 20,
      offset: (page - 1) * 20,
      attributes: ['id', 'date', 'title', 'description', 'address', 'past'],
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['name', 'email'],
          include: [
            {
              model: File,
              attributes: ['name', 'path', 'url']
            }
          ]
        },
      ],
    })

    return res.json(meetups);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().max(50).required(),
      description: Yup.string().required(),
      address: Yup.string().required(),
      date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const user_id = req.userId;

    const { date, title, description, address } = req.body;

    /**
     * Check for past dates
     */
    const hourStart = startOfHour(parseISO(date));

    if (isBefore(hourStart, new Date())) {
      return res.status(400).json({ error: 'Past dates are not permitted' });
    }

    const checkAvailability = await Meetup.findOne({
      where: {
        user_id,
        canceled_at: null,
        date: hourStart,
      },
    });

    if (checkAvailability) {
      return res.status(400).json({ erro: 'Meetup date is not available' });
    }

    const meetup = await Meetup.create({
      user_id,
      title,
      description,
      address,
      date,
    });

    return res.json(meetup);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().max(50),
      description: Yup.string(),
      address: Yup.string(),
      date: Yup.date(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const meetup = await Meetup.findByPk(req.params.id);

    if (meetup.user_id !== req.userId) {
      return res.status(400).json({ error: 'You do not have permission for updated this meetup' })
    }

    if (meetup.past) {
      return res.status(400).json({ error: 'This meetup cannot be updated because it is already finalized' })
    }

    meetup.update({
      ...req.body
    });

    return res.send(meetup);
  }

  async delete(req, res) {
    const meetup = await Meetup.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['name', 'email'],
        },
      ],
    });

    if (meetup && meetup.canceled_at) {
      return res.status(401).json({
        error: 'The appointment is already canceled'
      })
    }

    if (meetup.user_id !== req.userId) {
      return res.status(401).json({
        error: "You don't have permission to cancel this meetup"
      });
    }

    meetup.canceled_at = new Date();

    await meetup.save();

    return res.json(meetup);
  }
}

export default new MeetupController();

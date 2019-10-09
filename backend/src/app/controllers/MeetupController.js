import * as Yup from 'yup';
import {
  startOfDay,
  endOfDay,
  startOfHour,
  parseISO,
  isBefore,
} from 'date-fns';
import { Op } from 'sequelize';

import Meetup from '../models/Meetup';
import User from '../models/User';
import File from '../models/File';

class MeetupController {
  async index(req, res) {
    try {

      const { date, page = 1 } = req.query;

      const searchDate = Number(date);

      const meetups = await Meetup.findAll({
        where: date ? {
          user_id: req.userId,
          date: {
            [Op.between]: [startOfDay(searchDate), endOfDay(searchDate)]
          }
        } : { user_id: req.userId },
        order: ['date'],
        limit: 10,
        offset: (page - 1) * 10,
        attributes: ['id', 'date', 'title', 'description', 'address', 'past'],
        include: [
          {
            model: User,
            as: 'user',
            attributes: ['name', 'email'],
            include: [
              {
                model: File,
                as: 'avatar',
                attributes: ['name', 'path', 'url']
              }
            ]
          },
          {
            model: File,
            as: 'file',
            attributes: ['name', 'path', 'url']
          }
        ],
      })

      return res.json(meetups);
    } catch (err) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async store(req, res) {
    try {

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
    } catch (err) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async update(req, res) {
    try {
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

      if (meetup.canceled_at) {
        return res.status(400).json({ error: 'This meetup has already been canceled' })
      }

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
    } catch (err) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async delete(req, res) {
    try {
      const meetup = await Meetup.findByPk(req.params.id, {
        include: [
          {
            model: User,
            as: 'user',
            attributes: ['name', 'email'],
          },
        ],
      });

      if (meetup.past) {
        return res.status(401).json({
          error: 'The meetup has already past'
        })
      }

      if (meetup.user_id !== req.userId) {
        return res.status(401).json({
          error: "You don't have permission to cancel this meetup"
        });
      }

      await meetup.destroy();

      return res.json({ success: 'Meetup deleted with success' });
    } catch (err) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export default new MeetupController();

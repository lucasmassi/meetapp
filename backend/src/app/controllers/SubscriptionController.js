import * as Yup from 'yup';
import {
  startOfDay,
  endOfDay,
  getTime,
} from 'date-fns';
import { Op } from 'sequelize';

import Subscription from '../models/Subscription';
import Meetup from '../models/Meetup';
import User from '../models/User';
import File from '../models/File';

class SubscriptionController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const subscriptions = await Subscription.findAll({
      where: { user_id: req.userId },
      order: ['created_at'],
      limit: 20,
      offset: (page - 1) * 20,
      attributes: ['id', 'canceled_at'],
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
          model: Meetup,
          as: 'meetup',
          attributes: ['title', 'description', 'date'],
          include: [
            {
              model: File,
              as: 'file',
              attributes: ['name', 'path', 'url']
            }
          ]
        },
      ],
    })

    return res.json(subscriptions);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      meetup_id: Yup.number().required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const user_id = req.userId;

    const { meetup_id } = req.body;

    const meetup = await Meetup.findByPk(meetup_id);

    // O usuário deve poder se inscrever em meetups que não organiza.
    if (meetup.user_id === user_id) {
      return res.status(400).json({ erro: 'You do not subscribe in this meetup, your is organizer' });
    }
    // O usuário não pode se inscrever em meetups que já aconteceram.
    if (meetup.past) {
      return res.status(400).json({ erro: 'This meetup is past' });
    }

    const compareDate = Number(getTime(meetup.date));

    // O usuário não pode se inscrever em dois meetups que acontecem no mesmo horário.
    const newMeetup = await Meetup.findOne({
      where: {
        id: meetup_id,
        date: {
          [Op.between]: [startOfDay(compareDate), endOfDay(compareDate)]
        }
      }
    });

    const existingMeetup = await Subscription.findOne({
      where: {
        user_id,
        meetup_id: newMeetup.id,
      }
    });

    if (existingMeetup) {
      return res.status(400).json({ erro: 'You are subscribed to a meetup at this time' });
    }

    const checkAvailability = await Subscription.findOne({
      where: {
        user_id,
        meetup_id,
      },
    });

    // O usuário não pode se inscrever no mesmo meetup duas vezes.
    if (checkAvailability) {
      return res.status(400).json({ erro: 'You are already subscribed to this meetup' });
    }

    const subscription = await Subscription.create({
      user_id,
      meetup_id,
    });

    return res.json(subscription);
  }

  async delete(req, res) {
    const subscription = await Subscription.findByPk(req.params.id);

    if (subscription.user_id !== req.userId) {
      return res.status(401).json({
        error: "You don't have permission to cancel this meetup"
      });
    }

    await subscription.destroy();

    return res.json({ success: 'Subscription deleted with success' });
  }
}

export default new SubscriptionController();

import models from '../models'
import Sequelize from 'sequelize';

const { meeting, user, userMeeting, sequelize } = models
const attributes = { exclude: ['password'] };

export function findAll(req, res) {
  return req.current.getMeetings()
    .then(data => res.send(data))
    .catch(err => res.status(400).send(err))
}

export async function findOne(req, res) {
  const { id } = req.params;

  try {
    const dbMeetings = await req.current.getMeetings({ where: { id } });
    if (!dbMeetings?.length) {
      return res.status(404).send({ message: 'Meeting not found.'});
    }

    const m = await meeting.findByPk(id, { include: {
        model: user,
        as: 'users',
        attributes,
        through: {
          attributes: []
        }
      }
    });
    res.send(m);
  } catch (e) {
    res.status(400).send(e);
  }
}

export async function create(req, res) {
  const { users, start, end, roomId, name } = req.body;
  const currentUser = req.current;

  const transaction = await sequelize.transaction();

  try {
    const meetingsForRoomInSpecificTime = await meeting.findAll({
      where: {
        roomId,
        [Sequelize.Op.or]: [{
          start: {
            [Sequelize.Op.between]: [new Date(start), new Date(end)]
          }
        }, {
          end: {
            [Sequelize.Op.between]: [new Date(start), new Date(end)]
          }
        }]
      }
    })

    if (meetingsForRoomInSpecificTime?.length) {
      return res.status(403).send({ message: 'There is already a booking for specific time.'});
    }

    const dbMeeting = await meeting.create({ name, start, end, roomId }, { transaction });
    await Promise.all([currentUser, ...users.filter(user => user.id !== currentUser.id)].map((item) => {
      const usrMeeting = {
        userId: item.id,
        meetingId: dbMeeting.id,
        organizer: item.id === currentUser.id
      }

      return userMeeting.create(usrMeeting, { transaction });
    }))
    await transaction.commit();

    return res.status(200).send(dbMeeting)
  } catch (e) {
    await transaction.rollback();
    res.status(400).send(e);
  }
}

export async function update(req, res) {
  const { id } = req.params;
  const { users, start, end, roomId, name } = req.body;
  const currentUser = req.current;

  const transaction = await sequelize.transaction();

  try {
    const dbMeetings = await req.current.getMeetings({ where: { id }, through: { where: { organizer: true } } });
    if (!dbMeetings?.length) {
      return res.status(403).send({ message: 'You are not organizer of this meeting' });
    }
    const [dbMeeting] = dbMeetings;

    const meetingsForRoomInSpecificTime = await meeting.findAll({
      where: {
        id: { [Sequelize.Op.not]: dbMeeting.id },
        roomId,
        [Sequelize.Op.or]: [{
          start: {
            [Sequelize.Op.between]: [new Date(start), new Date(end)]
          }
        }, {
          end: {
            [Sequelize.Op.between]: [new Date(start), new Date(end)]
          }
        }]
      }
    })

    if (meetingsForRoomInSpecificTime?.length) {
      return res.status(403).send({ message: 'There is already a booking for specific time.'});
    }

    const usersByMeetingWithoutOrganizer = await dbMeeting.getUsers({
      where: { id: { [Sequelize.Op.not]: currentUser.id} }
    });
    await dbMeeting.removeUsers(usersByMeetingWithoutOrganizer, { transaction });
    await Promise.all(users.filter(item => item.id !== currentUser.id).map((item) => (
      userMeeting.create({ userId: item.id, meetingId: dbMeeting.id }, { transaction })
    )))
    await meeting.update({ name, start, end, roomId }, { where: { id }, transaction });
    await transaction.commit();
    return res.status(200).send(req.body)
  } catch (e) {
    await transaction.rollback();
    res.status(400).send(e);
  }
}

export async function del(req, res) {
  const { id } = req.params;

  const transaction = await sequelize.transaction();

  try {
    const dbMeetings = await req.current.getMeetings({ where: { id }, through: { where: { organizer: true } } });

    if (!dbMeetings?.length) {
      return res.status(403).send({ message: 'You are not organizer of this meeting' });
    }

    const [dbMeeting] = dbMeetings;
    const users = await dbMeeting.getUsers();
    await dbMeeting.removeUsers(users, { transaction });
    await meeting.destroy({ where: { id }, transaction });
    await transaction.commit();
    return res.sendStatus(200);
  } catch (e) {
    await transaction.rollback();
    res.status(400).send(e);
  }
}

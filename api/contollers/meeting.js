import models from '../models'

const { meeting, user, room, sequelize, userMeeting } = models
const include = [
  {
    model: user,
    as: 'users'
  },
  {
    model: room,
    as: 'room'
  },
];

export function findAll(req, res) {
  return meeting.findAll({ include })
    .then(data => res.send(data))
    .catch(err => {
      console.log(err)
      res.status(400).send(err)
    })
}

export function findOne(req, res) {
  const { id } = req.params;

  return meeting.findByPk(id, { include })
    .then(data => res.send(data))
    .catch(err => res.status(400).send(err))
}

export async function create(req, res) {
  const { users, ...attributes } = req.body;
  const transaction = await sequelize.transaction();

  try {
    const createdMeeting = await meeting.create(attributes, { transaction });

    users && await Promise.all(users.map(async (item) => {
      const usr = await user.findByPk(item.id);

      if (!usr) {
        return res.status(400);
      }

      const usrMeeting = {
        userId: item.id,
        meetingId: createdMeeting.id,
      }

      return userMeeting.create(usrMeeting, { transaction });
    }))

    await transaction.commit();

    return res.status(200).send(createdMeeting)
  } catch (e) {
    await transaction.rollback();
    res.status(400).send(e);
  }
}

export async function update(req, res) {
  const { id } = req.params;
  const { users, ...attributes } = req.body;
  const foundMeeting = await meeting.findByPk(id);
  const usersByMeeting = await foundMeeting.getUsers();
  const transaction = await sequelize.transaction();

  try {
    await foundMeeting.removeUsers(usersByMeeting, { transaction });
    await Promise.all(users.map((item) => {
      const usrMeeting = {
        userId: item.id,
        meetingId: foundMeeting.id,
      }

      return userMeeting.create(usrMeeting, { transaction });
    }))

    await meeting.update(attributes, { where: { id }, transaction });
    await transaction.commit();
    return res.status(200).send(req.body)
  } catch (e) {
    await transaction.rollback();
    res.status(400).send(e);
  }
}

export async function del(req, res) {
  const { id } = req.params;

  const foundMeeting = await meeting.findByPk(id);
  const users = await foundMeeting.getUsers();
  const transaction = await sequelize.transaction();

  try {
    await foundMeeting.removeUsers(users, { transaction });
    await meeting.destroy({ where: { id }, transaction });
    await transaction.commit();
    return res.sendStatus(200);
  } catch (e) {
    await transaction.rollback();
    res.status(400).send(e);
  }
}

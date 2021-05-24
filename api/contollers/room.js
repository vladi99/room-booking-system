import models from '../models'
import Sequelize from 'sequelize';

const { room, companyRoom, sequelize, company } = models

export function findAll(req, res) {
  return req.company.getRooms()
    .then(data => res.send(data))
    .catch(err => res.status(400).send(err))
}

export async function findOne(req, res) {
  const { id } = req.params;

  try {
    const dbRooms = await req.company.getRooms({ where: { id } });
    if (!dbRooms?.length) {
      return res.status(404).send({ message: 'Room not found.'});
    }

    const r = await room.findByPk(id, { include: {
        model: company,
        as: 'companies',
        through: {
          attributes: []
        }
      }
    });
    res.send(r);
  } catch (e) {
    res.status(400).send(e);
  }
}

export async function findAllRoomsMeetings(req, res) {
  const { id } = req.params;

  try {
    const dbRoom = await req.company.getRooms({ where: id });
    if (!dbRoom) {
      return res.status(404).send({ message: 'Room not found.'});
    }
    const dbMeetings = await dbRoom.getMeetings();
    res.send(dbMeetings);
  } catch (e) {
    res.status(400).send(e);
  }
}

export async function create(req, res) {
  const { name } = req.body;
  const transaction = await sequelize.transaction();

  try {
    const dbCompany = req.company;
    const dbRoom = await room.create({ name }, { transaction });

    const cr = {
      roomId: dbRoom.id,
      companyId: dbCompany.id,
      owner: true
    }

    await companyRoom.create(cr, { transaction })
    await transaction.commit();

    return res.status(200).send(dbRoom)
  } catch (e) {
    await transaction.rollback();
    res.status(400).send(e);
  }
}

export async function update(req, res) {
  const { id } = req.params;
  const { companies, ...attributes } = req.body;
  const dbCompany = req.company;

  const transaction = await sequelize.transaction();

  try {
    const dbRooms = await dbCompany.getRooms({ where: { id }, through: { where: { owner: true } } });
    if (!dbRooms?.length) {
      return res.status(404).send({ message: 'Room not found.'});
    }
    const dbRoom = dbRooms[0];
    const companiesByRoomWithoutOwner = await dbRoom.getCompanies({
      where: { id: { [Sequelize.Op.not]: dbCompany.id} }
    });
    await dbRoom.removeCompanies(companiesByRoomWithoutOwner, { transaction });
    await Promise.all(companies.filter(item => item.id !== dbCompany.id).map((item) => (
      companyRoom.create({ companyId: item.id, roomId: dbRoom.id }, { transaction })
    )))

    await room.update(attributes, { where: { id }, transaction });
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
    const dbRoom = await req.company.getRooms({ where: { id }, through: { where: { owner: true } } });
    if (!dbRoom) {
      return res.status(404).send({ message: 'Room not found.'});
    }

    const companies = await dbRoom.getCompanies();
    await dbRoom.removeCompanies(companies, { transaction });
    await room.destroy({ where: { id }, transaction });
    await transaction.commit();
    return res.sendStatus(200);
  } catch (e) {
    await transaction.rollback();
    res.status(400).send(e);
  }
}

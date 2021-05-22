import models from '../models'

const { room, company, companyRoom, sequelize } = models

export function findAll(req, res) {
  return room.findAll({
    include: {
      model: company,
      as: 'companies'
    }
  }).then(data => res.send(data))
    .catch(err => res.status(400).send(err))
}

export function findOne(req, res) {
  const { id } = req.params;

  return room.findByPk(id, {
    include: {
      model: company,
      as: 'companies'
    }
  })
    .then(data => res.send(data))
    .catch(err => res.status(400).send(err))
}

export async function create(req, res) {
  const { name, companies } = req.body;
  const transaction = await sequelize.transaction();

  try {
    const createdRoom = await room.create({ name }, { transaction });

    companies && await Promise.all(companies.map(async (item) => {
      const comp = await company.findByPk(item.id);

      if (!comp) {
        return res.status(400);
      }

      const companyRoomData = {
        companyId: item.id,
        roomId: createdRoom.id,
      }

      return companyRoom.create(companyRoomData, { transaction });
    }))

    await transaction.commit();

    return res.status(200).send(createdRoom)
  } catch (e) {
    await transaction.rollback();
    res.status(400).send(e);
  }
}

export async function update(req, res) {
  const { id } = req.params;
  const { name, companies } = req.body;
  const foundRoom = await room.findByPk(id);
  const companiesByRoom = await foundRoom.getCompanies();
  const transaction = await sequelize.transaction();

  try {
    await foundRoom.removeCompanies(companiesByRoom, { transaction });
    await Promise.all(companies.map((item) => {
      const comp = {
        companyId: item.id,
        roomId: foundRoom.id,
      }

      return companyRoom.create(comp, { transaction });
    }))

    await room.update({ name }, { where: { id }, transaction });
    await transaction.commit();
    return res.status(200).send(req.body)
  } catch (e) {
    await transaction.rollback();
    res.status(400).send(e);
  }
}

export async function del(req, res) {
  const { id } = req.params;

  const foundRoom = await room.findByPk(id);
  const companies = await foundRoom.getCompanies();
  const transaction = await sequelize.transaction();

  try {
    await foundRoom.removeCompanies(companies, { transaction });
    await room.destroy({ where: { id }, transaction });
    await transaction.commit();
    return res.sendStatus(200);
  } catch (e) {
    await transaction.rollback();
    res.status(400).send(e);
  }
}

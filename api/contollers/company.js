import models from '../models'
import Sequelize from 'sequelize';

const { company, sequelize } = models

export function findAll(req, res) {
  return company.findAll({
    where: {
      name: {
        [Sequelize.Op.substring]: req.query.name || ''
      }
    }
  }).then(data => res.send(data))
    .catch(err => res.status(400).send(err.errors))
}

export function findOne(req, res) {
  const { id } = req.params;

  return company.findByPk(id)
    .then(data => res.send(data))
    .catch(err => res.status(400).send(err.errors))
}

export function create(req, res) {
  const { name } = req.body;

  return company.create({ name })
    .then(data => res.send(data))
    .catch(err => res.status(400).send(err.errors))
}

export function update(req, res) {
  const { id } = req.params;

  return company.update(req.body, {
    where: { id }
  }).then(() => res.send(req.body))
    .catch(err => res.status(400).send(err.errors))
}

export async function del(req, res) {
  const { id } = req.params;

  const foundCompany = await company.findByPk(id);
  const rooms = await foundCompany.getRooms();
  const transaction = await sequelize.transaction();

  try {
    await foundCompany.removeRooms(rooms, { transaction });
    await company.destroy({ where: { id }, transaction });
    await transaction.commit();
    return res.sendStatus(200);
  } catch (e) {
    await transaction.rollback();
    res.status(400).send(e);
  }
}


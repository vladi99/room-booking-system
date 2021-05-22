import models from '../models'
import Sequelize from 'sequelize';

const { user } = models

export function findAll(req, res) {
  return user.findAll({
    where: {
      email: {
        [Sequelize.Op.substring]: req.query.email || ''
      }
    }
  }).then(data => res.send(data))
    .catch(err => res.status(400).send(err))
}

export function findOne(req, res) {
  const { id } = req.params;

  return user.findByPk(id)
    .then(data => res.send(data))
    .catch(err => res.status(400).send(err))
}

export function create(req, res) {
  const { firstName, lastName, email, companyId } = req.body;

  return user.create({ firstName, lastName, email, companyId })
    .then(data => res.send(data))
    .catch(err => res.status(400).send(err))
}

export function update(req, res) {
  const { id } = req.params;

  return user.update(req.body, {
    where: { id }
  }).then(() => res.send(req.body))
    .catch(err => res.status(400).send(err))
}

export function del(req, res) {
  const { id } = req.params;

  return user.destroy({
    where: { id }
  }).then(() => res.sendStatus(200))
    .catch(err => res.status(400).send(err))
}


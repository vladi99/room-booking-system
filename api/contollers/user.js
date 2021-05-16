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
    .catch(err => res.status(400).send({
      message: err.message
    }))
}

export function create(req, res) {
  const { firstName, lastName, email } = req.body;

  return user.create({ firstName, lastName, email })
    .then(data => res.send(data))
    .catch(err => res.status(400).send({
      message: err.message
    }))
}

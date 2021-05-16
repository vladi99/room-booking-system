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
    .catch(err => res.status(500).send({
      message: err.message || 'Something went wrong when fetching users.'
    }))
}

export function create(req, res) {
  const { firstName, lastName, email } = req.body;

  if (!firstName) {
    res.status(400).send({
      message: 'Name cannot be empty.'
    });
  }

  if (!lastName) {
    res.status(400).send({
      message: 'Price cannot be empty.'
    });
  }

  if (!email) {
    res.status(400).send({
      message: 'Description cannot be empty.'
    });
  }

  return user.create({ firstName, lastName, email })
    .then(data => res.send(data))
    .catch(err => res.status(500).send({
      message: err.message || 'Something went wrong when creating a user.'
    }))
}

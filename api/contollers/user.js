import models from '../models'
import { ROLES } from '../models/role';
import Sequelize from 'sequelize';

const { user, role, sequelize, company, room } = models;
const attributes = { exclude: ['password'] };

const include = {
  model: role,
  as: 'roles',
  through: {
    attributes: []
  }
};

export async function findAll(req, res) {
  const companyId = await req.current.companyId;

  try {
    if (companyId) {
      const dbCompany = await company.findByPk(companyId, {
        include: {
          model: room,
          as: 'rooms',
          through: {
            attributes: []
          },
          include: {
            model: company,
            as: 'companies',
            through: {
              attributes: []
            },
          }
        }
      })

      const companies = dbCompany.rooms.flatMap(r => r.companies)
      const companyIds = companies.map(({id}) => id);

      const uniqueCompanyIds = new Set([...companyIds, companyId]);
      const users = await user.findAll({
        where: {
          companyId: {
            [Sequelize.Op.in]: [...uniqueCompanyIds]
          }
        },
        attributes,
        include
      });

      return res.send(users)
    }

    const dbUsers = await user.findAll({ attributes, include });

    res.send(dbUsers);
  } catch (e) {
    res.status(400).send(e)
  }
}

export async function findOne(req, res) {
  const { id } = req.params;
  const isAdmin = await req.current.isAdmin();
  if (+req.current.id !== +id && !isAdmin) {
    return res.sendStatus(403);
  }

  return user.findByPk(id, { attributes, include })
    .then(data => res.send(data))
    .catch(err => res.status(400).send(err))
}

export async function create(req, res) {
  // TODO: remove hardcoded password, send email with user able to create password
  const { firstName, lastName, email, companyId, roles, password = '12345678' } = req.body;

  const existingUser = await user.findOne({ where: { email } });

  if (existingUser) {
    res.status(400).send({ errors: [{ path: 'email', message: 'Email is already in use.'}] });
    return;
  }

  if (roles.some(role => !ROLES.includes(role.name))) {
    res.status(400).send({ errors: [{ path: 'roles', message: 'Role does not exist.'}] });
    return;
  }

  const transaction = await sequelize.transaction();

  try {
    const dbUser = await user.create({ firstName, lastName, email, companyId, password }, { transaction });

    if (roles) {
      const dbRoles = await role.findAll({
        where: {
          id: {
            [Sequelize.Op.or]: roles.map(({id}) => id)
          }
        }
      });
      await dbUser.setRoles(dbRoles, { transaction });
    }

    await transaction.commit();
    res.status(200).send({
      ...dbUser.toJSON(),
      password: undefined
    })
  } catch (e) {
    await transaction.rollback();
    res.status(400).send(e);
  }
}

export async function update(req, res) {
  const { id } = req.params;

  try {
    await user.update(req.body, { where: { id } });
    const dbUser = await user.findByPk(id, { attributes });
    res.send(dbUser)
  } catch (e) {
    res.status(400).send(e)
  }
}

export async function del(req, res) {
  const { id } = req.params;
  const userToDelete = await user.findByPk(id);

  const isAdmin = await req.current.isAdmin();
  const isCompanyAdmin = await req.current.isCompanyAdmin();

  if(!isAdmin && !isCompanyAdmin) {
    return res.sendStatus(403);
  }

  if (!isAdmin && req.current.companyId !== userToDelete.companyId) {
    return res.status(403).send({message: 'You are not managing this user.'});
  }

  return user.destroy({
    where: { id }
  }).then(() => res.sendStatus(200))
    .catch(err => res.status(400).send(err))
}


import Sequelize from 'sequelize';
import models from '../models';
import { ADMIN, COMPANY_ADMIN, MEMBER } from '../models/role';
const { role } = models

export async function findAll(req, res) {
  try {
    const availableRoles = [MEMBER, COMPANY_ADMIN];

    if(await req.current.isAdmin()) {
      availableRoles.push(ADMIN)
    }

    const dbRoles = await role.findAll({ where: { name: { [Sequelize.Op.in]: availableRoles } }})
    res.send(dbRoles);
  } catch (e) {
    res.status(400).send(e);
  }
}

import models from '../models';
import jwt from 'jsonwebtoken';

const { user, role } = models;

const secret = process.env.BCRYPT_SECRET;

export async function signIn(req, res) {
  try {
    const dbUser = await user.findOne({
      where: {
        email: req.body.email
      },
      include: {
        model: role,
        as: 'roles',
        through: {
          attributes: []
        }
      }
    })

    if (!dbUser) {
      return res.status(404).send({ errors: [{ path: 'email', message: 'User with such email does not exist.' }] });
    }

    const isValid = await dbUser.validPassword(req.body.password);

    if (!isValid) {
      return res.status(401).send({ errors: [{ path: 'password', message: 'Invalid password.' }] });
    }

    const token = jwt.sign({ id: dbUser.id }, secret, { expiresIn: '1d' });

    return res.status(200).send({
      ...dbUser.toJSON(),
      password: undefined,
      accessToken: token
    });
  } catch (e) {
    return res.status(400).send(e)
  }
}

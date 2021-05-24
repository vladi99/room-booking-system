import { promisify } from 'util';
import jwt from 'jsonwebtoken';
import models from '../models'

const { user } = models
const secret = process.env.BCRYPT_SECRET;
const jwtVerifyAsync = promisify(jwt.verify).bind(jwt);

export async function verifyToken(req, res, next) {
  const token = req.headers['x-access-token'];

  if (!token) {
    return res.status(403).send({ message: 'Missing token.' });
  }

  try {
    const { id } = await jwtVerifyAsync(token, secret);
    req.current = await user.findByPk(id);
    return next();
  } catch (e) {
    return res.sendStatus(401);
  }
}

export async function isAdmin(req, res, next) {
  const isAdmin = await req.current.isAdmin();

  if (isAdmin) {
    next();
    return;
  }

  res.sendStatus(403);
}

export async function isCompanyAdmin(req, res, next) {
  const isCompanyAdmin = await req.current.isCompanyAdmin();

  if (isCompanyAdmin) {
    next();
    return;
  }

  res.sendStatus(403);
}

export async function isCompanyAdminOrAdmin(req, res, next) {
  const [isCompanyAdmin, isAdmin] = await Promise.all([
    req.current.isCompanyAdmin(),
    req.current.isAdmin()
  ])

  if (isCompanyAdmin || isAdmin) {
    next();
    return;
  }

  res.sendStatus(403);
}


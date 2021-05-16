import express from 'express';
import { create, findAll } from '../contollers/user';

export default function (app) {
  const router = express.Router();
  router.get('/', findAll);
  router.post('/', create);

  app.use('/api/users', router);
}

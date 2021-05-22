import express from 'express';
import { create, findAll, del, findOne, update } from '../contollers/meeting';

export default function (app) {
  const router = express.Router();
  router.get('/', findAll);
  router.get('/:id', findOne);
  router.post('/', create);
  router.put('/:id', update);
  router.delete('/:id', del);

  app.use('/api/meetings', router);
}

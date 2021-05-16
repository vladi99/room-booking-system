import express from 'express';
import { getCounter } from '../contollers/counter.js';

export default function (app) {
  const router = express.Router();
  router.get('/', getCounter);

  app.use('/api/counter', router);
}

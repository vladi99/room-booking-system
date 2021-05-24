import express from 'express';
import {  verifyToken } from '../middlewares/authJwt'
import { findAll } from '../contollers/roles';

const router = express.Router();

router.get('/', verifyToken, findAll);

export default router;

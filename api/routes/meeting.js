import express from 'express';
import { findOne, findAll, update, create, del } from '../contollers/meeting';
import { verifyToken } from '../middlewares/authJwt';
import { verifyUserId } from '../middlewares/user';

const router = express.Router({ mergeParams : true });

const verifiers = [verifyToken, verifyUserId]

router.get('/', ...verifiers, findAll);
router.get('/:id', ...verifiers, findOne);
router.post('/', ...verifiers, create);
router.put('/:id', ...verifiers, update);
router.delete('/:id', ...verifiers, del);

export default router;

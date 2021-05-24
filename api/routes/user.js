import express from 'express';
import { create, del, findAll, findOne, update } from '../contollers/user';
import { isCompanyAdminOrAdmin, verifyToken } from '../middlewares/authJwt'

const router = express.Router({ mergeParams : true });

router.get('/', verifyToken, findAll);
router.get('/:id', verifyToken, findOne);
router.post('/', create);
router.put('/:id', verifyToken, update);
router.delete('/:id', verifyToken, isCompanyAdminOrAdmin, del);

export default router;

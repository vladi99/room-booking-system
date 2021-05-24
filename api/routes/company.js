import express from 'express';
import { create, findAll, del, findOne, update } from '../contollers/company';
import { verifyToken, isAdmin, isCompanyAdminOrAdmin } from '../middlewares/authJwt'

const router = express.Router();

router.get('/', verifyToken, isCompanyAdminOrAdmin, findAll);
router.get('/:id', verifyToken, isCompanyAdminOrAdmin, findOne);
router.post('/', verifyToken, isAdmin, create);
router.put('/:id', verifyToken, isCompanyAdminOrAdmin, update);
router.delete('/:id', verifyToken, isAdmin, del);

export default router;

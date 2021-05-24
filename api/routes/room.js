import express from 'express';
import { create, findAll, del, findOne, update, findAllRoomsMeetings } from '../contollers/room';
import { verifyToken, isCompanyAdmin } from '../middlewares/authJwt'
import { verifyCompanyId } from '../middlewares/company';

const router = express.Router({ mergeParams : true });

router.get('/', verifyToken, verifyCompanyId, findAll);
router.get('/:id', verifyToken, verifyCompanyId, findOne);
router.get('/:id/meetings', verifyToken, verifyCompanyId, findAllRoomsMeetings);
router.post('/', verifyToken, isCompanyAdmin, verifyCompanyId, create);
router.put('/:id', verifyToken, isCompanyAdmin, verifyCompanyId, update);
router.delete('/:id', verifyToken, isCompanyAdmin, verifyCompanyId, del);

export default router;

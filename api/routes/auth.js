import express from 'express';
import { signIn } from '../contollers/auth';

const router = express.Router();

router.post('/', signIn);

export default router;

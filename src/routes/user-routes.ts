import express from 'express';
import { userRegistration, userLogin } from '../controller/user-controller';
import { verify } from '../auth';

const router = express.Router();

router.post('/user-registration', verify, userRegistration);
router.post('/login', userLogin);


export default router;
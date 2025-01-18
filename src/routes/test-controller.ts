import express from 'express';
import { testController, testController2 } from '../controller/test-controller'; // Ensure test-controller exports something

const router = express.Router();

router.get('/controller1', testController);
router.get('/controller2', testController2);

export default router; 

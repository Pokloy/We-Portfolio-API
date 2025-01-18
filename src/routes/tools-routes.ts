import express from 'express';
import { addNewTool, deleteSpecificTools, findSpecificTools, getAllTools, updateSpecificTools } from '../controller/tools-controller';
import { verify } from '../auth';

const router = express.Router();

router.post('/add-tools', verify, addNewTool);

router.delete('/delete-tools/:toolId', verify, deleteSpecificTools);

router.get('/get-tools', getAllTools);

router.get('/find-tools/:toolId', findSpecificTools);

router.put('/update-tools/:toolId', verify, updateSpecificTools);

export default router;
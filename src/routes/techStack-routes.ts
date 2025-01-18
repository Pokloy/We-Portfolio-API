import express from 'express';
import { addNewTechStack, deleteSpecificTechStack, findSpecificTechStack, getAllTechStack, updateSpecificTechStack } from '../controller/techStack-controller';
import { verify } from '../auth';

const router = express.Router();

router.post('/add-techStack', verify, addNewTechStack);

router.delete('/delete-techStack/:techStackId', verify, deleteSpecificTechStack);

router.get('/get-techStack', getAllTechStack);

router.get('/find-techStack/:techStackId', findSpecificTechStack);

router.put('/update-techStack/:techStackId', verify, updateSpecificTechStack);

export default router;
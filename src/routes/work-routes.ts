import express from 'express';
import { addNewWork, deleteSpecificWork, findSpecificWork, getAllWorks, updateSpecificWork, seeSpecificWorkPicture } from '../controller/work-controller';
import { verify } from '../auth';

const router = express.Router();

router.post('/add-work', verify, addNewWork);

router.delete('/delete-work/:workId', verify, deleteSpecificWork);

router.get('/get-work', getAllWorks);

router.get('/find-work/:workId', findSpecificWork);

router.get('/find-work-picture/:workId', seeSpecificWorkPicture);

router.put('/update-work/:workId', verify, updateSpecificWork);


export default router;
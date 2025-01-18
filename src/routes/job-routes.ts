import express from 'express';
import { getAllJob, addJob, deleteSpecificJob, findSpecificJob, updateSpecificJob } from '../controller/job-controllers';
import { verify } from '../auth';

const router = express.Router();

router.get('/get-job', getAllJob);

router.post('/add-job', verify, addJob);

router.delete('/delete-job/:jobId', verify, deleteSpecificJob);

router.get('/find-job/:jobId', verify, findSpecificJob);

router.put('/update-job/:jobId', verify, updateSpecificJob);

export default router;


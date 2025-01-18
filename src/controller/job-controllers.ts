import { Request, Response } from 'express';
import mongoose from 'mongoose';

const Jobs = require('../models/Jobs');

export const findSpecificJob = async (req: Request, res: Response): Promise<any> => {
    const { jobId } = req.params;

    try {
        const findSpecificJob = await Jobs.findById(jobId);

        return res.status(200).json({
            message: 'Specific Job found',
            findSpecificJob
        })
    } catch (error) {
        return res.status(500).json({ 
            message: 'An error occurred while finding specific job', 
            error: error.message 
        });
    }
}

export const getAllJob = async (req: Request, res: Response): Promise<any> => {
    try {
 
        const getAllJob = await Jobs.find({});

        return res.status(200).json({
            message: 'All Jobs retrieved successufully',
            getAllJob
        })
        
    } catch (error) {
        return res.status(500).send({
            message: 'An error occurred while creating the job',
            error: error.message,
        });
    }
}

export const addJob = async (req: Request, res: Response): Promise<any> => {
    try {
        const { timeline, company } = req.body;

        if(!timeline || !company){
            return res.status(400).send({
                message: 'Missing required fields: timeline and company',
            });
        }
            const newJob = new Jobs({
                timeline,
                company,
            });
            
            
            newJob.save().then((job, error) => {
                if(error) {
                    return res.status(400).send({
                        message: 'No job has been inserted',
                        blog: newJob,
                    });
                } else {
                    return res.status(200).send({
                        message: 'New job created successfully',
                        blog: newJob,
                    });
                }
            })
    } catch (error) {
        return res.status(500).send({
            message: 'An error occurred while creating the job',
            error: error.message,
        });
    }
}

export const deleteSpecificJob = async (req: Request, res: Response): Promise<any> => {
    const { jobId } = req.params;

    try {
       if(!mongoose.Types.ObjectId.isValid(jobId)){
          return res.status(400).json({ message: 'Invalid job ID format' });
       }
       
       const deletedJob = await Jobs.findByIdAndDelete(jobId);

       if(!deletedJob){
          return res.status(404).json({ message: 'Job not found' });
       }

       return res.status(200).json({
          message: 'Job deleted successfully',
          job: deletedJob
       })

    } catch (error) {
        return res.status(500).json({ 
            message: 'An error occurred while deleting the job', 
            error: error.message 
        });
    }
}

export const updateSpecificJob = async (req: Request, res: Response): Promise<any> => {
    const { jobId } = req.params;
    const { timeline, company } = req.body;
    
    try {
        const jobInfo = await Jobs.findById({_id:jobId});

        if(!jobInfo){
            return res.status(404).json({ message: 'Job not found' });
        }

        jobInfo.timeline = timeline || jobInfo.timeline;
        jobInfo.company = company || jobInfo.company;

        jobInfo.save();
        return res.status(200).json({ 
            message: 'Specific Job updated', 
            jobInfo
        });

    } catch (error) {
        return res.status(500).json({ 
            message: 'An error occurred while updating the job', 
            error: error.message 
        });
    }
}


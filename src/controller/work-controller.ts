import { Request, Response } from 'express';
import mongoose from 'mongoose';

const Works = require("../models/Work");

export const addNewWork = async (req: Request, res: Response): Promise<any> => {
    try {
        const newWork = new Works({
            type: req.body.type,
            header: req.body.header,
            subHeader: req.body.subHeader,
            picture: req.body.picture,
            subInformation: req.body.subInformation
        });

       await newWork.save().then((work, error)=> {
            if(error){
                return res.status(400).send({
                    message: 'No work has been inserted',
                    work:newWork,
                });
            } else {
                return res.status(200).send({
                    message: 'New job created successfull',
                    work: newWork,
                });
            }
        })
    } catch (error) {
        return res.status(500).send({
            message: 'An error occured while creating the job',
            error: error.message,
        });
    }
}

export const deleteSpecificWork = async (req: Request, res: Response): Promise<any> => {
    const { workId } = req.params;

    try {
        if(!mongoose.Types.ObjectId.isValid(workId)){
            return res.status(400).json({ message: 'Invalid work ID format' })
        }

        const deletedWork = await Works.findByIdAndDelete(workId);

        if(!deletedWork){
            return res.status(404).json({ message: 'Blog not found' });
        }

        return res.status(200).json({
            message: 'Job deleted successfully',
            works: deletedWork
        });
    } catch (error) {
        return res.status(500).json({
            message: 'An error occcured while deleting a work',
            error: error.message
        });
    }
}

export const findSpecificWork = async (req: Request, res: Response): Promise<any> => {
    const { workId } = req.params;

    try {
        const findSpecificWork = await Works.findById(workId);

        return res.status(200).json({
            message: 'Specific Work found',
            findSpecificWork
        })
    } catch (error) {
        return res.status(500).json({ 
            message: 'An error occurred while finding specific work', 
            error: error.message 
        });
    }
}

export const getAllWorks = async (req: Request, res: Response): Promise<any> => {
    try {
        const getallWork = await Works.find({});

        return res.status(200).json({
            message:"All Work retrieved successfully",
            getallWork
        })
    } catch (error) {
        return res.status(500).send({
            message: 'An error occurred while getting all work',
            error: error.message,
        });
    }
}

export const updateSpecificWork = async (req: Request, res: Response): Promise<any> => {
    const { workId } = req.params;
    const { type, header, subHeader, picture, subInformation } = req.body;

    try {
        const workInfo = await Works.findById({_id:workId});

        if(!workInfo){
            return res.status(404).json({ message: 'work not found' });
        }

        workInfo.type = type || workInfo.type;
        workInfo.header = header || workInfo.header;
        workInfo.subHeader = subHeader || workInfo.subHeader;
        workInfo.picture = picture || workInfo.picture;
        workInfo.subInformation = subInformation || workInfo.subInformation;

        workInfo.save();
        return res.status(200).json({
            message: 'Specific Work update',
            workInfo
        });

    } catch (error) {
        return res.status(500).json({ 
            message: 'An error occurred while updating the work', 
            error: error.message 
        });
    }
}

export const seeSpecificWorkPicture = async (req: Request, res: Response): Promise<any> => {
    const { workId } = req.params;

    try{
        const workInfo = await Works.findById({_id:workId});

        if(!workInfo){
            return res.status(404).json({ message: 'work not found' });
        }

        return res.status(200).json({
            message: 'Specific Work Video found',
            picture: workInfo.picture
        })
    } catch (error){
        return res.status(500).json({ 
            message: 'An error occurred while looking for the picture work', 
            error: error.message 
        });
    }
}
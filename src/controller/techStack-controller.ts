import { Request, Response } from 'express';
import mongoose from 'mongoose';

const TechStack = require('../models/TechStack');

export const addNewTechStack = async (req: Request, res: Response): Promise<any> => {
    try {
        const newTechStack = new TechStack({
            header:req.body.header,
            subHeader: req.body.subHeader,
            content: req.body.content,
            picture: req.body.picture,
            date: req.body.date
        });
        
        
        await newTechStack.save().then((techStack, error)=> {
            if(error){
                return res.status(400).send({
                    message: 'No tech stack has been inserted',
                    techStack: newTechStack,
                });
            } else {
                return res.status(200).send({
                    message: 'New tech stack created successfully',
                    techStack: newTechStack,
                });
            }
        })
    } catch (error) {
        return res.status(500).send({
            message: 'An error occured while creating the tech stack',
            error: error.message,
        });
    }
}

export const deleteSpecificTechStack = async (req: Request, res: Response): Promise<any> => {
    const { techStackId } = req.params;

    try {
        if(!mongoose.Types.ObjectId.isValid(techStackId)){
            return res.status(400).json({ message: 'Invalid tech stack ID format' })
        }

        const deletedTechStack = await TechStack.findByIdAndDelete(techStackId);

        if(!deletedTechStack){
            return res.status(404).json({ message: 'tech stack not found' });
        }

        return res.status(200).json({
            message: 'Tech Stack deleted successfully',
            techStack: deletedTechStack
        });
    } catch (error) {
        return res.status(500).json({
            message: 'An error occcured while deleting a tech stack',
            error: error.message
        });
    }
}

export const findSpecificTechStack = async (req: Request, res: Response): Promise<any> => {
    const { techStackId } = req.params;

    try {
        const findSpecificTechStack = await TechStack.findById(techStackId);

        return res.status(200).json({
            message: 'Specific Tech Stack Found',
            findSpecificTechStack
        })
    } catch (error) {
        return res.status(500).json({ 
            message: 'An error occurred while finding specific tech stack', 
            error: error.message 
        });
    }
}

export const getAllTechStack = async (req: Request, res: Response): Promise<any> => {
    try {
        const getallTechStack = await TechStack.find({});

        return res.status(200).json({
            message: "All Tech Stack retrieved successfully",
            getallTechStack
        })
    } catch (error) {
        return res.status(500).send({
            message: 'An error occurred while getting all tech stack',
            error: error.message,
        });
    }
}

export const updateSpecificTechStack = async (req: Request, res: Response): Promise<any> => {
    const { techStackId } = req.params;
    const { header, subHeader, content, picture, date } = req.body;

    try {
        const techStackInfo = await TechStack.findById({_id:techStackId});

        if(!techStackInfo){
            return res.status(404).json({ message: 'tech stack not found' });
        }

        techStackInfo.header = header || techStackInfo.header;
        techStackInfo.subHeader = subHeader || techStackInfo.subHeader;
        techStackInfo.content = content || techStackInfo.content;
        techStackInfo.picture = picture || techStackInfo.picture;
        techStackInfo.date = date || techStackInfo.date;

        techStackInfo.save();
        return res.status(200).json({
            message: 'Specific Tech Stack Update',
            techStackInfo
        });

    } catch (error) {
        return res.status(500).json({ 
            message: 'An error occurred while updating the tech stack', 
            error: error.message 
        });
    }
}
import { Request, Response } from 'express';
import mongoose from 'mongoose';

const Tools = require("../models/Tools")

export const addNewTool = async (req: Request, res: Response): Promise<any> => {
    try {
        const newTool = new Tools({
            header: req.body.header,
            subHeader: req.body.subHeader,
            content: req.body.content,
            picture: req.body.picture,
            date: req.body.date
        });

        await newTool.save().then((tools, error)=>{
            if(error){
                return res.status(400).send({
                    message: 'No tools has been inserted',
                    tools: newTool,
                });
            } else {
                return res.status(200).send({
                    message: 'New tools created successfully',
                    tools: newTool,
                });
            }
        }) 
    } catch (error) {
        return res.status(500).send({
            message: 'An error occured while creating the tools',
            error: error.message,
        });
    }
}

export const deleteSpecificTools = async (req: Request, res: Response): Promise<any> => {
    const { toolId } = req.params;

    try {
        if(!mongoose.Types.ObjectId.isValid(toolId)){
            return res.status(400).json({ message: 'Invalid tool ID format' })
        }

        const deletedTools = await Tools.findByIdAndDelete(toolId);

        if(!deletedTools){
            return res.status(404).json({ message: 'Tools not found' });
        }

        return res.status(200).json({
            message: 'Tools deleted successfully',
            tools: deletedTools
        });
    } catch (error) {
        return res.status(500).json({
            message: 'An error occcured while deleting a tools',
            error: error.message
        });
    }
}

export const findSpecificTools = async (req: Request, res: Response): Promise<any> => {
    const { toolId } = req.params;

    try {
        const findSpecificTool = await Tools.findById(toolId);

        return res.status(200).json({
            message: 'Specific Tools found',
            findSpecificTool
        })
    } catch (error) {
        return res.status(500).json({ 
            message: 'An error occurred while finding specific tools', 
            error: error.message 
        });
    }
}

export const getAllTools = async (req: Request, res: Response): Promise<any> => {
    try {
        const getAllTools = await Tools.find({});

        return res.status(200).json({
            message: "All Tools retrieved successfully",
            getAllTools
        })
    } catch (error) {
        return res.status(500).send({
            message: 'An error occurred while getting all Tools',
            error: error.message,
        });
    }
}

export const updateSpecificTools = async (req: Request, res: Response): Promise<any> => {
    const { toolId } = req.params;
    const { header, subHeader, content, picture, date } = req.body;

    try {
        const toolsInfo = await Tools.findById({_id:toolId});

        if(!toolsInfo){
            return res.status(404).json({ message: 'tools not found' });
        }

        toolsInfo.header = header || toolsInfo.header;
        toolsInfo.subHeader = subHeader || toolsInfo.subHeader;
        toolsInfo.content = content || toolsInfo.content;
        toolsInfo.picture = picture || toolsInfo.picture;
        toolsInfo.date = date || toolsInfo.date;

        toolsInfo.save();
        return res.status(200).json({
            message: 'Specific Tool update',
            toolsInfo
        })
    } catch (error) {
        return res.status(500).json({ 
            message: 'An error occurred while updating the tools', 
            error: error.message 
        });
    }

}
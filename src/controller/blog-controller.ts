import { Request, Response } from 'express';
import mongoose from 'mongoose';


const Blog = require("../models/Blog");

export const addNewBlog = (req: Request, res: Response): any => {
    try {
        const { header, picture, content, subInfo } = req.body;

        if (!header || !picture || !content) {
            return res.status(400).send({
                message: 'Missing required fields: header, picture, or content',
            });
        }

        const newBlog = new Blog({
            header,
            picture,
            content,
            subInfo,
        });

        newBlog.save().then((blog, error)=>{
            if(error){
                return res.status(400).send({
                    message: 'No blog has been inserted',
                    blog: newBlog,
                });
            } else {
                return res.status(200).send({
                    message: 'New blog created successfully',
                    blog: newBlog,
                });
            }
        })

        
    } catch (error) {
        return res.status(500).send({
            message: 'An error occurred while creating the blog',
            error: error.message,
        });
    }
};


export const deleteSpecificBlog = async (req: Request, res: Response): Promise<any> => {
    const { blogId } = req.params;

    try {
        // Validate ObjectId format
        if (!mongoose.Types.ObjectId.isValid(blogId)) {
            return res.status(400).json({ message: 'Invalid blog ID format' });
        }

        // Find and delete the blog by its ID
        const deletedBlog = await Blog.findByIdAndDelete(blogId);

        // Check if the blog existed
        if (!deletedBlog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        // Return success response
        return res.status(200).json({ 
            message: 'Blog deleted successfully', 
            blog: deletedBlog 
        });

    } catch (error) {
        // Handle server errors
        return res.status(500).json({ 
            message: 'An error occurred while deleting the blog', 
            error: error.message 
        });
    }
};

export const getAllBlog = async (req: Request, res: Response): Promise<any> => {
    try {
        const getAllBlog = await Blog.find({});

        // Return success response
        return res.status(200).json({ 
            message: 'All Blog retrieved successfully', 
            getAllBlog
        });
    } catch (error) {
        // Handle server errors
        return res.status(500).json({ 
            message: 'An error occurred while deleting the blog', 
            error: error.message 
        });
    }
}


export const findSpecificBlog = async (req: Request, res: Response): Promise<any> => {
    const { blogId } = req.params;
    try {
        const findSpecificBlog = await Blog.findById(blogId);

        // Return success response
        return res.status(200).json({ 
            message: 'Specific Blog found', 
            findSpecificBlog
        });
    } catch (error) {
        // Handle server errors
        return res.status(500).json({ 
            message: 'An error occurred while finding specific blog', 
            error: error.message 
        });
    }
}

export const updateSpecificBlog = async (req: Request, res: Response): Promise<any> => {
    const { blogId } = req.params;
    const { header, picture, content, subInfo } = req.body;

    try {
        const blogInfo = await Blog.findById({_id:blogId});

        if(!blogInfo){
            return res.status(404).json({ message: 'Banner not found' });
        }

        blogInfo.header = header || blogInfo.header;
        blogInfo.picture = picture || blogInfo.picture;
        blogInfo.content = content || blogInfo.content;
        blogInfo.subInfo = subInfo || blogInfo.subInfo;

        // Return success response
        blogInfo.save();
        return res.status(200).json({ 
            message: 'Specific Blog updated', 
            blogInfo
        });
        

    } catch (error) {
        return res.status(500).json({ 
            message: 'An error occurred while updating the blog', 
            error: error.message 
        });
    }
}

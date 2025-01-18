"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSpecificBlog = exports.findSpecificBlog = exports.getAllBlog = exports.deleteSpecificBlog = exports.addNewBlog = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Blog = require("../models/Blog");
const addNewBlog = (req, res) => {
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
        newBlog.save().then((blog, error) => {
            if (error) {
                return res.status(400).send({
                    message: 'No blog has been inserted',
                    blog: newBlog,
                });
            }
            else {
                return res.status(200).send({
                    message: 'New blog created successfully',
                    blog: newBlog,
                });
            }
        });
    }
    catch (error) {
        return res.status(500).send({
            message: 'An error occurred while creating the blog',
            error: error.message,
        });
    }
};
exports.addNewBlog = addNewBlog;
const deleteSpecificBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { blogId } = req.params;
    try {
        // Validate ObjectId format
        if (!mongoose_1.default.Types.ObjectId.isValid(blogId)) {
            return res.status(400).json({ message: 'Invalid blog ID format' });
        }
        // Find and delete the blog by its ID
        const deletedBlog = yield Blog.findByIdAndDelete(blogId);
        // Check if the blog existed
        if (!deletedBlog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        // Return success response
        return res.status(200).json({
            message: 'Blog deleted successfully',
            blog: deletedBlog
        });
    }
    catch (error) {
        // Handle server errors
        return res.status(500).json({
            message: 'An error occurred while deleting the blog',
            error: error.message
        });
    }
});
exports.deleteSpecificBlog = deleteSpecificBlog;
const getAllBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getAllBlog = yield Blog.find({});
        // Return success response
        return res.status(200).json({
            message: 'All Blog retrieved successfully',
            getAllBlog
        });
    }
    catch (error) {
        // Handle server errors
        return res.status(500).json({
            message: 'An error occurred while deleting the blog',
            error: error.message
        });
    }
});
exports.getAllBlog = getAllBlog;
const findSpecificBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { blogId } = req.params;
    try {
        const findSpecificBlog = yield Blog.findById(blogId);
        // Return success response
        return res.status(200).json({
            message: 'Specific Blog found',
            findSpecificBlog
        });
    }
    catch (error) {
        // Handle server errors
        return res.status(500).json({
            message: 'An error occurred while finding specific blog',
            error: error.message
        });
    }
});
exports.findSpecificBlog = findSpecificBlog;
const updateSpecificBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { blogId } = req.params;
    const { header, picture, content, subInfo } = req.body;
    try {
        const blogInfo = yield Blog.findById({ _id: blogId });
        if (!blogInfo) {
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
    }
    catch (error) {
        return res.status(500).json({
            message: 'An error occurred while updating the blog',
            error: error.message
        });
    }
});
exports.updateSpecificBlog = updateSpecificBlog;
//# sourceMappingURL=blog-controller.js.map
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
exports.updateSpecificTechStack = exports.getAllTechStack = exports.findSpecificTechStack = exports.deleteSpecificTechStack = exports.addNewTechStack = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const TechStack = require('../models/TechStack');
const addNewTechStack = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newTechStack = new TechStack({
            header: req.body.header,
            subHeader: req.body.subHeader,
            content: req.body.content,
            picture: req.body.picture,
            date: req.body.date
        });
        yield newTechStack.save().then((techStack, error) => {
            if (error) {
                return res.status(400).send({
                    message: 'No tech stack has been inserted',
                    techStack: newTechStack,
                });
            }
            else {
                return res.status(200).send({
                    message: 'New tech stack created successfully',
                    techStack: newTechStack,
                });
            }
        });
    }
    catch (error) {
        return res.status(500).send({
            message: 'An error occured while creating the tech stack',
            error: error.message,
        });
    }
});
exports.addNewTechStack = addNewTechStack;
const deleteSpecificTechStack = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { techStackId } = req.params;
    try {
        if (!mongoose_1.default.Types.ObjectId.isValid(techStackId)) {
            return res.status(400).json({ message: 'Invalid tech stack ID format' });
        }
        const deletedTechStack = yield TechStack.findByIdAndDelete(techStackId);
        if (!deletedTechStack) {
            return res.status(404).json({ message: 'tech stack not found' });
        }
        return res.status(200).json({
            message: 'Tech Stack deleted successfully',
            techStack: deletedTechStack
        });
    }
    catch (error) {
        return res.status(500).json({
            message: 'An error occcured while deleting a tech stack',
            error: error.message
        });
    }
});
exports.deleteSpecificTechStack = deleteSpecificTechStack;
const findSpecificTechStack = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { techStackId } = req.params;
    try {
        const findSpecificTechStack = yield TechStack.findById(techStackId);
        return res.status(200).json({
            message: 'Specific Tech Stack Found',
            findSpecificTechStack
        });
    }
    catch (error) {
        return res.status(500).json({
            message: 'An error occurred while finding specific tech stack',
            error: error.message
        });
    }
});
exports.findSpecificTechStack = findSpecificTechStack;
const getAllTechStack = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getallTechStack = yield TechStack.find({});
        return res.status(200).json({
            message: "All Tech Stack retrieved successfully",
            getallTechStack
        });
    }
    catch (error) {
        return res.status(500).send({
            message: 'An error occurred while getting all tech stack',
            error: error.message,
        });
    }
});
exports.getAllTechStack = getAllTechStack;
const updateSpecificTechStack = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { techStackId } = req.params;
    const { header, subHeader, content, picture, date } = req.body;
    try {
        const techStackInfo = yield TechStack.findById({ _id: techStackId });
        if (!techStackInfo) {
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
    }
    catch (error) {
        return res.status(500).json({
            message: 'An error occurred while updating the tech stack',
            error: error.message
        });
    }
});
exports.updateSpecificTechStack = updateSpecificTechStack;
//# sourceMappingURL=techStack-controller.js.map
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
exports.updateSpecificTools = exports.getAllTools = exports.findSpecificTools = exports.deleteSpecificTools = exports.addNewTool = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Tools = require("../models/Tools");
const addNewTool = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newTool = new Tools({
            header: req.body.header,
            subHeader: req.body.subHeader,
            content: req.body.content,
            picture: req.body.picture,
            date: req.body.date
        });
        yield newTool.save().then((tools, error) => {
            if (error) {
                return res.status(400).send({
                    message: 'No tools has been inserted',
                    tools: newTool,
                });
            }
            else {
                return res.status(200).send({
                    message: 'New tools created successfully',
                    tools: newTool,
                });
            }
        });
    }
    catch (error) {
        return res.status(500).send({
            message: 'An error occured while creating the tools',
            error: error.message,
        });
    }
});
exports.addNewTool = addNewTool;
const deleteSpecificTools = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { toolId } = req.params;
    try {
        if (!mongoose_1.default.Types.ObjectId.isValid(toolId)) {
            return res.status(400).json({ message: 'Invalid tool ID format' });
        }
        const deletedTools = yield Tools.findByIdAndDelete(toolId);
        if (!deletedTools) {
            return res.status(404).json({ message: 'Tools not found' });
        }
        return res.status(200).json({
            message: 'Tools deleted successfully',
            tools: deletedTools
        });
    }
    catch (error) {
        return res.status(500).json({
            message: 'An error occcured while deleting a tools',
            error: error.message
        });
    }
});
exports.deleteSpecificTools = deleteSpecificTools;
const findSpecificTools = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { toolId } = req.params;
    try {
        const findSpecificTool = yield Tools.findById(toolId);
        return res.status(200).json({
            message: 'Specific Tools found',
            findSpecificTool
        });
    }
    catch (error) {
        return res.status(500).json({
            message: 'An error occurred while finding specific tools',
            error: error.message
        });
    }
});
exports.findSpecificTools = findSpecificTools;
const getAllTools = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getAllTools = yield Tools.find({});
        return res.status(200).json({
            message: "All Tools retrieved successfully",
            getAllTools
        });
    }
    catch (error) {
        return res.status(500).send({
            message: 'An error occurred while getting all Tools',
            error: error.message,
        });
    }
});
exports.getAllTools = getAllTools;
const updateSpecificTools = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { toolId } = req.params;
    const { header, subHeader, content, picture, date } = req.body;
    try {
        const toolsInfo = yield Tools.findById({ _id: toolId });
        if (!toolsInfo) {
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
        });
    }
    catch (error) {
        return res.status(500).json({
            message: 'An error occurred while updating the tools',
            error: error.message
        });
    }
});
exports.updateSpecificTools = updateSpecificTools;
//# sourceMappingURL=tools-controller.js.map
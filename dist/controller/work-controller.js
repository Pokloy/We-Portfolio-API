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
exports.seeSpecificWorkPicture = exports.updateSpecificWork = exports.getAllWorks = exports.findSpecificWork = exports.deleteSpecificWork = exports.addNewWork = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Works = require("../models/Work");
const addNewWork = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newWork = new Works({
            type: req.body.type,
            header: req.body.header,
            subHeader: req.body.subHeader,
            picture: req.body.picture,
            subInformation: req.body.subInformation
        });
        yield newWork.save().then((work, error) => {
            if (error) {
                return res.status(400).send({
                    message: 'No work has been inserted',
                    work: newWork,
                });
            }
            else {
                return res.status(200).send({
                    message: 'New job created successfull',
                    work: newWork,
                });
            }
        });
    }
    catch (error) {
        return res.status(500).send({
            message: 'An error occured while creating the job',
            error: error.message,
        });
    }
});
exports.addNewWork = addNewWork;
const deleteSpecificWork = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { workId } = req.params;
    try {
        if (!mongoose_1.default.Types.ObjectId.isValid(workId)) {
            return res.status(400).json({ message: 'Invalid work ID format' });
        }
        const deletedWork = yield Works.findByIdAndDelete(workId);
        if (!deletedWork) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        return res.status(200).json({
            message: 'Job deleted successfully',
            works: deletedWork
        });
    }
    catch (error) {
        return res.status(500).json({
            message: 'An error occcured while deleting a work',
            error: error.message
        });
    }
});
exports.deleteSpecificWork = deleteSpecificWork;
const findSpecificWork = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { workId } = req.params;
    try {
        const findSpecificWork = yield Works.findById(workId);
        return res.status(200).json({
            message: 'Specific Work found',
            findSpecificWork
        });
    }
    catch (error) {
        return res.status(500).json({
            message: 'An error occurred while finding specific work',
            error: error.message
        });
    }
});
exports.findSpecificWork = findSpecificWork;
const getAllWorks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getallWork = yield Works.find({});
        return res.status(200).json({
            message: "All Work retrieved successfully",
            getallWork
        });
    }
    catch (error) {
        return res.status(500).send({
            message: 'An error occurred while getting all work',
            error: error.message,
        });
    }
});
exports.getAllWorks = getAllWorks;
const updateSpecificWork = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { workId } = req.params;
    const { type, header, subHeader, picture, subInformation } = req.body;
    try {
        const workInfo = yield Works.findById({ _id: workId });
        if (!workInfo) {
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
    }
    catch (error) {
        return res.status(500).json({
            message: 'An error occurred while updating the work',
            error: error.message
        });
    }
});
exports.updateSpecificWork = updateSpecificWork;
const seeSpecificWorkPicture = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { workId } = req.params;
    try {
        const workInfo = yield Works.findById({ _id: workId });
        if (!workInfo) {
            return res.status(404).json({ message: 'work not found' });
        }
        return res.status(200).json({
            message: 'Specific Work Video found',
            picture: workInfo.picture
        });
    }
    catch (error) {
        return res.status(500).json({
            message: 'An error occurred while looking for the picture work',
            error: error.message
        });
    }
});
exports.seeSpecificWorkPicture = seeSpecificWorkPicture;
//# sourceMappingURL=work-controller.js.map
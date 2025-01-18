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
exports.updateSpecificJob = exports.deleteSpecificJob = exports.addJob = exports.getAllJob = exports.findSpecificJob = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Jobs = require('../models/Jobs');
const findSpecificJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { jobId } = req.params;
    try {
        const findSpecificJob = yield Jobs.findById(jobId);
        return res.status(200).json({
            message: 'Specific Job found',
            findSpecificJob
        });
    }
    catch (error) {
        return res.status(500).json({
            message: 'An error occurred while finding specific job',
            error: error.message
        });
    }
});
exports.findSpecificJob = findSpecificJob;
const getAllJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getAllJob = yield Jobs.find({});
        return res.status(200).json({
            message: 'All Jobs retrieved successufully',
            getAllJob
        });
    }
    catch (error) {
        return res.status(500).send({
            message: 'An error occurred while creating the job',
            error: error.message,
        });
    }
});
exports.getAllJob = getAllJob;
const addJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { timeline, company } = req.body;
        if (!timeline || !company) {
            return res.status(400).send({
                message: 'Missing required fields: timeline and company',
            });
        }
        const newJob = new Jobs({
            timeline,
            company,
        });
        newJob.save().then((job, error) => {
            if (error) {
                return res.status(400).send({
                    message: 'No job has been inserted',
                    blog: newJob,
                });
            }
            else {
                return res.status(200).send({
                    message: 'New job created successfully',
                    blog: newJob,
                });
            }
        });
    }
    catch (error) {
        return res.status(500).send({
            message: 'An error occurred while creating the job',
            error: error.message,
        });
    }
});
exports.addJob = addJob;
const deleteSpecificJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { jobId } = req.params;
    try {
        if (!mongoose_1.default.Types.ObjectId.isValid(jobId)) {
            return res.status(400).json({ message: 'Invalid job ID format' });
        }
        const deletedJob = yield Jobs.findByIdAndDelete(jobId);
        if (!deletedJob) {
            return res.status(404).json({ message: 'Job not found' });
        }
        return res.status(200).json({
            message: 'Job deleted successfully',
            job: deletedJob
        });
    }
    catch (error) {
        return res.status(500).json({
            message: 'An error occurred while deleting the job',
            error: error.message
        });
    }
});
exports.deleteSpecificJob = deleteSpecificJob;
const updateSpecificJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { jobId } = req.params;
    const { timeline, company } = req.body;
    try {
        const jobInfo = yield Jobs.findById({ _id: jobId });
        if (!jobInfo) {
            return res.status(404).json({ message: 'Job not found' });
        }
        jobInfo.timeline = timeline || jobInfo.timeline;
        jobInfo.company = company || jobInfo.company;
        jobInfo.save();
        return res.status(200).json({
            message: 'Specific Job updated',
            jobInfo
        });
    }
    catch (error) {
        return res.status(500).json({
            message: 'An error occurred while updating the job',
            error: error.message
        });
    }
});
exports.updateSpecificJob = updateSpecificJob;
//# sourceMappingURL=job-controllers.js.map
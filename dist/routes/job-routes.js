"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const job_controllers_1 = require("../controller/job-controllers");
const auth_1 = require("../auth");
const router = express_1.default.Router();
router.get('/get-job', job_controllers_1.getAllJob);
router.post('/add-job', auth_1.verify, job_controllers_1.addJob);
router.delete('/delete-job/:jobId', auth_1.verify, job_controllers_1.deleteSpecificJob);
router.get('/find-job/:jobId', auth_1.verify, job_controllers_1.findSpecificJob);
router.put('/update-job/:jobId', auth_1.verify, job_controllers_1.updateSpecificJob);
exports.default = router;
//# sourceMappingURL=job-routes.js.map
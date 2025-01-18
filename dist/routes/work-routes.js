"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const work_controller_1 = require("../controller/work-controller");
const auth_1 = require("../auth");
const router = express_1.default.Router();
router.post('/add-work', auth_1.verify, work_controller_1.addNewWork);
router.delete('/delete-work/:workId', auth_1.verify, work_controller_1.deleteSpecificWork);
router.get('/get-work', work_controller_1.getAllWorks);
router.get('/find-work/:workId', work_controller_1.findSpecificWork);
router.get('/find-work-picture/:workId', work_controller_1.seeSpecificWorkPicture);
router.put('/update-work/:workId', auth_1.verify, work_controller_1.updateSpecificWork);
exports.default = router;
//# sourceMappingURL=work-routes.js.map
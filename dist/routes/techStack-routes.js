"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const techStack_controller_1 = require("../controller/techStack-controller");
const auth_1 = require("../auth");
const router = express_1.default.Router();
router.post('/add-techStack', auth_1.verify, techStack_controller_1.addNewTechStack);
router.delete('/delete-techStack/:techStackId', auth_1.verify, techStack_controller_1.deleteSpecificTechStack);
router.get('/get-techStack', techStack_controller_1.getAllTechStack);
router.get('/find-techStack/:techStackId', techStack_controller_1.findSpecificTechStack);
router.put('/update-techStack/:techStackId', auth_1.verify, techStack_controller_1.updateSpecificTechStack);
exports.default = router;
//# sourceMappingURL=techStack-routes.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tools_controller_1 = require("../controller/tools-controller");
const auth_1 = require("../auth");
const router = express_1.default.Router();
router.post('/add-tools', auth_1.verify, tools_controller_1.addNewTool);
router.delete('/delete-tools/:toolId', auth_1.verify, tools_controller_1.deleteSpecificTools);
router.get('/get-tools', tools_controller_1.getAllTools);
router.get('/find-tools/:toolId', tools_controller_1.findSpecificTools);
router.put('/update-tools/:toolId', auth_1.verify, tools_controller_1.updateSpecificTools);
exports.default = router;
//# sourceMappingURL=tools-routes.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const test_controller_1 = require("../controller/test-controller"); // Ensure test-controller exports something
const router = express_1.default.Router();
router.get('/controller1', test_controller_1.testController);
router.get('/controller2', test_controller_1.testController2);
exports.default = router;
//# sourceMappingURL=test-controller.js.map
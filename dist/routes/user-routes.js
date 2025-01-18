"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controller/user-controller");
const auth_1 = require("../auth");
const router = express_1.default.Router();
router.post('/user-registration', auth_1.verify, user_controller_1.userRegistration);
router.post('/login', user_controller_1.userLogin);
exports.default = router;
//# sourceMappingURL=user-routes.js.map
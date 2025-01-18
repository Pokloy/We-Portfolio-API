"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const blog_controller_1 = require("../controller/blog-controller");
const auth_1 = require("../auth");
const router = express_1.default.Router();
// SAMPLE URL: http://localhost:3000/blog/add-blog
router.post('/add-blog', auth_1.verify, blog_controller_1.addNewBlog);
// SAMPLE URL: http://localhost:3000/blog/delete-blog/6751365daf19f100d106ce7d
router.delete('/delete-blog/:blogId', auth_1.verify, blog_controller_1.deleteSpecificBlog);
// SAMPLE URL: http://localhost:3000/blog/get-blog
router.get('/get-blog', blog_controller_1.getAllBlog);
router.get('/find-blog/:blogId', auth_1.verify, blog_controller_1.findSpecificBlog);
router.put('/update-blog/:blogId', auth_1.verify, blog_controller_1.updateSpecificBlog);
exports.default = router;
//# sourceMappingURL=blog-routes.js.map
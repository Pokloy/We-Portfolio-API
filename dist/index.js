"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const test_controller_1 = __importDefault(require("./routes/test-controller"));
const blog_routes_1 = __importDefault(require("./routes/blog-routes"));
const job_routes_1 = __importDefault(require("./routes/job-routes"));
const user_routes_1 = __importDefault(require("./routes/user-routes"));
const work_routes_1 = __importDefault(require("./routes/work-routes"));
const techStack_routes_1 = __importDefault(require("./routes/techStack-routes"));
const tools_routes_1 = __importDefault(require("./routes/tools-routes"));
const port = 4000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
mongoose_1.default.connect('mongodb+srv://admin:admin@my-sandbox-cluster.ry2lk.mongodb.net/PortfolioAPIDatabase')
    .then(() => console.log('Now connected to MongoDB Atlas.'))
    .catch(err => console.error('Connection error:', err));
mongoose_1.default.connection.once('open', () => console.log('Now connected to MongoDB Atlas.'));
mongoose_1.default.set('debug', true);
app.use('/test', test_controller_1.default);
app.use('/blog', blog_routes_1.default);
app.use('/job', job_routes_1.default);
app.use('/user', user_routes_1.default);
app.use('/work', work_routes_1.default);
app.use('/techstack', techStack_routes_1.default);
app.use('/tools', tools_routes_1.default);
// app.listen(port, () => {
//   return console.log(`Express is listening at http://localhost:${port}`);
// });
if (require.main === module) {
    app.listen(process.env.PORT || port, () => {
        console.log(`API is now online on port ${process.env.PORT || port}`);
    });
}
module.exports = { app, mongoose: mongoose_1.default };
//# sourceMappingURL=index.js.map
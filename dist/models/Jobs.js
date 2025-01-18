"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_sequence_1 = __importDefault(require("mongoose-sequence")); // Import the plugin
const AutoIncrement = (0, mongoose_sequence_1.default)(mongoose_1.default); // Pass the mongoose instance here
const jobSchema = new mongoose_1.default.Schema({
    jobsId: {
        type: Number,
        unique: true,
    },
    timeline: {
        type: String,
        required: [true, 'Job Experience Header of Info is Required'],
    },
    company: {
        type: String,
        required: [true, 'Job Experience Company of Info is Required'],
    }
});
jobSchema.plugin(AutoIncrement, { inc_field: 'jobsId' });
module.exports = mongoose_1.default.model('Jobs', jobSchema);
//# sourceMappingURL=Jobs.js.map
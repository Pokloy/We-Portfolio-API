"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_sequence_1 = __importDefault(require("mongoose-sequence")); // Import the plugin
const AutoIncrement = (0, mongoose_sequence_1.default)(mongoose_1.default); // Pass the mongoose instance here
const blogSchema = new mongoose_1.default.Schema({
    blogId: {
        type: Number, // Auto-incremented ID must be a number
        unique: true,
    },
    header: {
        type: String,
        required: [true, 'Header is Required'],
    },
    picture: {
        type: String,
        required: [true, 'Picture is Required'],
    },
    content: {
        type: String,
        required: [true, 'Content is Required'],
    },
    subInfo: [
        {
            header: {
                type: String,
                required: [true, 'Header of Info is Required'],
            },
            content: {
                type: String,
                required: [true, 'Content is Required'],
            },
            year: {
                type: String,
                required: [true, 'Year is Required'],
            },
        },
    ],
});
// Apply the AutoIncrement plugin to the schema
blogSchema.plugin(AutoIncrement, { inc_field: 'blogId' });
module.exports = mongoose_1.default.model('Blog', blogSchema);
//# sourceMappingURL=Blog.js.map
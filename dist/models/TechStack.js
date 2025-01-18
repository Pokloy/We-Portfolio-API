"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_sequence_1 = __importDefault(require("mongoose-sequence"));
const AutoIncrement = (0, mongoose_sequence_1.default)(mongoose_1.default);
const techStackSchema = new mongoose_1.default.Schema({
    techStackId: {
        type: Number,
        unique: true,
    },
    header: {
        type: String,
        required: [true, 'Header is Required']
    },
    subHeader: {
        type: String,
        required: [true, 'Sub Header is Required']
    },
    content: {
        type: String,
        required: [true, 'Content is Required']
    },
    picture: {
        type: String,
        required: [true, 'Picture is Required']
    },
    date: {
        type: String,
        required: [true, 'Date is Required']
    }
});
techStackSchema.plugin(AutoIncrement, { inc_field: 'techStackId' });
module.exports = mongoose_1.default.model('TechStack', techStackSchema);
//# sourceMappingURL=TechStack.js.map
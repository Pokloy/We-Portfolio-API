"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_sequence_1 = __importDefault(require("mongoose-sequence"));
const AutoIncrement = (0, mongoose_sequence_1.default)(mongoose_1.default);
const toolsSchema = new mongoose_1.default.Schema({
    toolsId: {
        type: Number,
        unique: true,
    },
    header: {
        type: String,
        required: [true, 'header is Required'],
    },
    subHeader: {
        type: String,
        required: [true, 'sub header is Required'],
    },
    content: {
        type: String,
        required: [true, 'content is Required'],
    },
    picture: {
        type: String,
        required: [true, 'picture is Required'],
    },
    date: {
        type: String,
        required: [true, 'date is Required'],
    },
});
toolsSchema.plugin(AutoIncrement, { inc_field: 'toolsId' });
module.exports = mongoose_1.default.model('Tools', toolsSchema);
//# sourceMappingURL=Tools.js.map
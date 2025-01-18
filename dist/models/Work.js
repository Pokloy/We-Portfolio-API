"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_sequence_1 = __importDefault(require("mongoose-sequence"));
const AutoIncrement = (0, mongoose_sequence_1.default)(mongoose_1.default);
const workSchema = new mongoose_1.default.Schema({
    workId: {
        type: Number,
        unique: true,
    },
    type: {
        type: String,
        required: [true, 'Type is Required'],
        enum: {
            values: ['UX', 'Dynamic Web', 'Static Web'],
            message: '{VALUE} is not a valid type',
        },
    },
    header: {
        type: String,
        required: [true, 'header is Required'],
    },
    subHeader: {
        type: String,
        required: [true, 'sub header is Required'],
    },
    picture: {
        type: String,
        required: [true, 'picture is Required'],
    },
    subInformation: [
        {
            client: {
                type: String,
                required: [true, 'client is Required'],
            },
            worktype: {
                type: String,
                required: [true, 'work type is Required'],
            },
            date: {
                type: String,
                required: [true, 'date is Required'],
            },
        },
    ],
});
workSchema.plugin(AutoIncrement, { inc_field: 'workId' });
module.exports = mongoose_1.default.model('Work', workSchema);
//# sourceMappingURL=Work.js.map
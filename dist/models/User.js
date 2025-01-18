"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_sequence_1 = __importDefault(require("mongoose-sequence"));
const AutoIncrement = (0, mongoose_sequence_1.default)(mongoose_1.default);
const userSchema = new mongoose_1.default.Schema({
    userId: {
        type: Number, // Auto-incremented ID must be a number
        unique: true,
    },
    username: {
        type: String,
        required: [true, 'Email is Required']
    },
    password: {
        type: String,
        required: [true, 'Password is Required']
    },
});
// Apply the AutoIncrement plugin to the schema
userSchema.plugin(AutoIncrement, { inc_field: 'userId' });
module.exports = mongoose_1.default.model('Users', userSchema);
//# sourceMappingURL=User.js.map
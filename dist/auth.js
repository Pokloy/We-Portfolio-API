"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verify = exports.createAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secret = 'alierPortfolioAPI';
const createAccessToken = (user) => {
    const data = {
        id: user._id,
        email: user.email,
        isAdmin: user.isAdmin,
    };
    return jsonwebtoken_1.default.sign(data, secret, {});
};
exports.createAccessToken = createAccessToken;
const verify = (req, res, next) => {
    console.log(req.headers.authorization);
    let token = req.headers.authorization;
    if (typeof token === 'undefined') {
        return res.send({ auth: 'Failed. No Token!' });
    }
    else {
        token = token.slice(7, token.length);
        jsonwebtoken_1.default.verify(token, secret, (err, decodedToken) => {
            if (err) {
                return res.send({
                    auth: 'Failed',
                    message: err.message,
                });
            }
            else {
                req.user = decodedToken;
                next();
            }
        });
    }
};
exports.verify = verify;
//# sourceMappingURL=auth.js.map
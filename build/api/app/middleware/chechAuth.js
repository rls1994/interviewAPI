"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
var AuthenticationToken_1 = __importDefault(require("../../../core/lib/AuthenticationToken"));
var AppError_1 = require("../../../Error/AppError");
dotenv_1.default.config();
exports.checkAuth = function (req, res, next) {
    try {
        // const token = req.query['x-access-token'] || req.headers['x-access-token']
        // if(!token)  res.status(403).send({success: false, message: "No token Provided"});
        // const decoded = jwt.verify(token, "secret");
        var token = req.headers.authorization.split(" ")[1];
        var decoded = AuthenticationToken_1.default.verify(token);
        if (typeof decoded != "boolean")
            req.tokenInfo = { id: decoded.id, phone: decoded.phone };
        else
            throw new AppError_1.AuthenticationError("Authentication Failed");
        next();
    }
    catch (error) {
        return res.status(401).json({
            message: 'Authentication failed',
            Error: error
        });
    }
};
// const token = jwt.sign(
//     {
//         permissions: ['a','b','c'],
//         Name:"Ram",
//     },
//     process.env.AUTH_SECRET!
//     ,
//     { expiresIn: 99999}
// );

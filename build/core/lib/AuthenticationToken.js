"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var AuthenticationToken = /** @class */ (function () {
    function AuthenticationToken() {
    }
    AuthenticationToken.create = function (data) {
        var token = jsonwebtoken_1.default.sign({
            id: data.id,
            phone: data.phone
        }, process.env.SECRET, {
            expiresIn: 999999
        });
        return token;
    };
    AuthenticationToken.verify = function (token) {
        try {
            var data = jsonwebtoken_1.default.verify(token, process.env.SECRET);
            if (typeof data === "object") {
                return data;
            }
            else if (typeof data === "boolean") {
                return data;
            }
            else {
                return false;
            }
        }
        catch (e) {
            return false;
        }
    };
    return AuthenticationToken;
}());
exports.default = AuthenticationToken;

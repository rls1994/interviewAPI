"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var bcrypt_1 = __importDefault(require("bcrypt"));
var HashAndComparePassword = /** @class */ (function () {
    function HashAndComparePassword() {
    }
    //to hash a password using bcrypt
    HashAndComparePassword.hashPassword = function (plainPassword) {
        return bcrypt_1.default.hashSync(plainPassword, 10);
    };
    HashAndComparePassword.comparePassword = function (plainPassword, passwordHash) {
        return bcrypt_1.default.compareSync(plainPassword, passwordHash);
    };
    return HashAndComparePassword;
}());
exports.default = HashAndComparePassword;

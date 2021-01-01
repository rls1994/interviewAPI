"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var Schema = new mongoose_1.default.Schema({
    _id: mongoose_1.default.Schema.Types.ObjectId,
    name: { type: String, required: [true, "Name is Required"] },
    phone: { type: String, required: [true, "Phone is Required"] },
    state: { type: String, required: [true, "State is Required"] },
    city: { type: String, required: [true, "City is Required"] },
    area: { type: String, required: [true, "Area is Required"] },
    password: { type: String, required: [true, "Password is Required"] },
    image: { type: String, default: null },
    address: { type: String, default: null },
    isVerified: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    createdOn: { type: Date, default: Date.now },
    modifiedOn: { type: Date, default: Date.now }
});
exports.default = mongoose_1.default.model('user', Schema);

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var Schema = new mongoose_1.default.Schema({
    _id: mongoose_1.default.Schema.Types.ObjectId,
    orderId: { type: String, required: [true, "Order Id is Required"] },
    message: { type: String, required: [true, "Message is Required"] },
    user: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'user', required: [true, "User Id is Required"] },
    vendor: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'vendor', required: [true, "Order Id is Required"] },
    deliveryAddress: { type: String, required: [true, "delivery address is Required"] },
    image: { type: [String], default: null },
    createdOn: { type: Date, default: Date.now },
    modifiedOn: { type: Date, default: Date.now }
});
exports.default = mongoose_1.default.model('order', Schema);

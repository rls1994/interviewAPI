"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//State district Mongoose model
var mongoose_1 = __importDefault(require("mongoose"));
var state_districtSchema = new mongoose_1.default.Schema({
    name: { type: String },
    districts: [
        {
            type: String
        }
    ]
});
exports.default = mongoose_1.default.model('StateDistrict', state_districtSchema);

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var SequentialIds_js_1 = __importDefault(require("./SequentialIds.js"));
exports.default = SequentialIds_js_1.default;
//  export const generator = new sequential.Generator({
//     digits: 10, letters: 4,
//     store: function(key:any, ids:any) {
//         Redis.save("uniqueOrderId", ids[ids.length - 1]);
//     },
//     restore: Redis.get("uniqueOrderId")? Redis.get("uniqueOrderId") : "ORDA - 000000"
// });

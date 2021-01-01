"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var moment_1 = __importDefault(require("moment"));
var FormatDate = /** @class */ (function () {
    function FormatDate() {
    }
    FormatDate.format = function (type, date) {
        if (type == "DD/MM/YYYY")
            return moment_1.default(date).format('L');
        else if (type == "Month DD YYYY")
            return moment_1.default(date).format('LL');
        else if (type == "Month DD YYYY HH:MM TT")
            return moment_1.default(date).format('LLL');
        else if (type == "DDD, MM, DD YYYY HH:MM TT")
            return moment_1.default(date).format('llll');
        else if (type == "Day, MM,DD YYYY HH:MM TT")
            return moment_1.default(date).format('LLLL');
        else if (type == "YYYY-MM-DD")
            return moment_1.default(date).format('YYYY-MM-DD');
        else if (type == "YYYY/MM/DD HH:MM")
            return moment_1.default(date).format('YYYY/MM/DD HH:MM');
        else if (type == "DD Mon, HH:MM TT")
            return moment_1.default(date).format('D MMM, LT');
        else
            return "Invalid Date";
    };
    return FormatDate;
}());
exports.default = FormatDate;

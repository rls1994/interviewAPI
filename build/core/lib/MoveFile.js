"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var move_file_1 = __importDefault(require("move-file"));
var MoveFile = /** @class */ (function () {
    function MoveFile() {
    }
    MoveFile.move = function (sourceLocation, targetLocation) {
        move_file_1.default.sync(sourceLocation, targetLocation);
    };
    return MoveFile;
}());
exports.default = MoveFile;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var FileStream = /** @class */ (function () {
    function FileStream() {
    }
    FileStream.create = function (dirName) {
        var p = FileStream.uploads + ("/" + dirName);
        if (!fs_1.default.existsSync(p)) {
            fs_1.default.mkdirSync(p);
        }
    };
    FileStream.deleteFile = function (path) {
        fs_1.default.unlinkSync(path);
    };
    FileStream.crateUploadDir = function () {
        if (!fs_1.default.existsSync(FileStream.uploads)) {
            fs_1.default.mkdirSync(FileStream.uploads);
            fs_1.default.mkdirSync(FileStream.uploads + '/tmp');
        }
    };
    FileStream.uploads = path_1.default.join(__dirname, '..', '..', 'uploads');
    return FileStream;
}());
exports.default = FileStream;

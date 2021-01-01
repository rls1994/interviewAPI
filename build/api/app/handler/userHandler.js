"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("../../../modulepatch/expresspatch");
var UserCtrl_1 = __importDefault(require("../../../core/controller/UserCtrl"));
var UserResponse_1 = __importDefault(require("../../responseFormatter/UserResponse"));
var AppError_1 = require("../../../Error/AppError");
exports.temp = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var data;
    return __generator(this, function (_a) {
        try {
            data = {};
            data.ip = req.ip;
            data.ip1 = (req.headers['x-forwarded-for'] || req.connection.remoteAddress || '');
            req.data = data;
            next();
        }
        catch (e) {
            next(e);
        }
        return [2 /*return*/];
    });
}); };
exports.register = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var data, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                if (!req.file)
                    throw new AppError_1.ValidationError("Uer.Image is Required");
                if (req.file)
                    req.body.image = req.file.path;
                return [4 /*yield*/, UserCtrl_1.default.register(req.body)];
            case 1:
                data = _a.sent();
                req.data = UserResponse_1.default.format(data);
                req.count = data.length;
                next();
                return [3 /*break*/, 3];
            case 2:
                e_1 = _a.sent();
                next(e_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.login = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var data, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                if (!req.body.phone)
                    throw new AppError_1.ValidationError("User Phone is Required");
                if (!req.body.password)
                    throw new AppError_1.ValidationError("User Password is Required");
                return [4 /*yield*/, UserCtrl_1.default.userLogin(req.body.phone, req.body.password)];
            case 1:
                data = _a.sent();
                req.data = [
                    data.token,
                    UserResponse_1.default.format([data.user])[0],
                ];
                req.count = 1;
                next();
                return [3 /*break*/, 3];
            case 2:
                e_2 = _a.sent();
                next(e_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.generateOtp = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var data, e_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                if (!req.body.phone)
                    throw new AppError_1.ValidationError("User Phone is Required");
                return [4 /*yield*/, UserCtrl_1.default.generateOtp(req.body.phone)];
            case 1:
                data = _a.sent();
                req.data = UserResponse_1.default.format(data);
                req.count = 1;
                next();
                return [3 /*break*/, 3];
            case 2:
                e_3 = _a.sent();
                next(e_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.verify = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var data, e_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                if (!req.body.phone)
                    throw new AppError_1.ValidationError("User Phone is Required");
                if (!req.body.otp)
                    throw new AppError_1.ValidationError("OTP is Required");
                return [4 /*yield*/, UserCtrl_1.default.verifyUser(req.body.phone, req.body.otp)];
            case 1:
                data = _a.sent();
                req.data = [
                    data.token,
                    UserResponse_1.default.format([data.user])[0],
                ];
                req.count = 1;
                next();
                return [3 /*break*/, 3];
            case 2:
                e_4 = _a.sent();
                next(e_4);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.forgotPassword = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var data, e_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                if (!req.body.phone)
                    throw new AppError_1.ValidationError("User Phone is Required");
                return [4 /*yield*/, UserCtrl_1.default.forgotPassword(req.body.phone)];
            case 1:
                data = _a.sent();
                req.data = UserResponse_1.default.format(data);
                req.count = 1;
                next();
                return [3 /*break*/, 3];
            case 2:
                e_5 = _a.sent();
                next(e_5);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.update = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var rs, e_6;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 2, , 3]);
                if (req.file)
                    req.body.image = req.file.path;
                req.body.id = (_a = req.tokenInfo) === null || _a === void 0 ? void 0 : _a.id;
                req.body.phone = (_b = req.tokenInfo) === null || _b === void 0 ? void 0 : _b.phone;
                if (req.body.password)
                    delete req.body.password;
                return [4 /*yield*/, UserCtrl_1.default.update(req.body)];
            case 1:
                rs = _c.sent();
                req.count = 1;
                req.data = UserResponse_1.default.format(rs);
                next();
                return [3 /*break*/, 3];
            case 2:
                e_6 = _c.sent();
                next(e_6);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.changePassword = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var data, e_7;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 2, , 3]);
                if (!req.body.oldPassword)
                    throw new AppError_1.ValidationError("Old Password is Required");
                if (!req.body.newPassword)
                    throw new AppError_1.ValidationError("New Password is Required");
                req.body.id = (_a = req.tokenInfo) === null || _a === void 0 ? void 0 : _a.id;
                req.body.phone = (_b = req.tokenInfo) === null || _b === void 0 ? void 0 : _b.phone;
                return [4 /*yield*/, UserCtrl_1.default.changePassword(req.body.phone, req.body.oldPassword, req.body.newPassword)];
            case 1:
                data = _c.sent();
                req.data = UserResponse_1.default.format(data);
                req.count = 1;
                next();
                return [3 /*break*/, 3];
            case 2:
                e_7 = _c.sent();
                next(e_7);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };

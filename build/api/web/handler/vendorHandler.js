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
var VendorCtrl_1 = __importDefault(require("../../../core/controller/VendorCtrl"));
var VendorResponse_1 = __importDefault(require("../../responseFormatter/VendorResponse"));
var AppError_1 = require("../../../Error/AppError");
exports.get = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var data, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, VendorCtrl_1.default.get(req.body)];
            case 1:
                data = _a.sent();
                req.data = VendorResponse_1.default.format(data);
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
exports.getArea = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var filter, data, areas, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                filter = { state: "Haryana", city: "Bhiwani" };
                return [4 /*yield*/, VendorCtrl_1.default.get(filter)];
            case 1:
                data = _a.sent();
                areas = VendorResponse_1.default.formatAndGetArea(data);
                req.data = areas;
                req.count = areas.length;
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
exports.add = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var rs, e_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, VendorCtrl_1.default.add(req.body)];
            case 1:
                rs = _a.sent();
                req.data = VendorResponse_1.default.format(rs);
                req.count = rs.length;
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
exports.bulkUpload = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var file, res_1, e_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                file = req.file;
                if (!file)
                    throw new AppError_1.ValidationError("Vendor CSV Sheet is Required!");
                return [4 /*yield*/, VendorCtrl_1.default.bulkUpload(file.path)];
            case 1:
                res_1 = _a.sent();
                req.data = VendorResponse_1.default.format(res_1);
                req.count = res_1.length;
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
exports.update = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var rs, e_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, VendorCtrl_1.default.update(req.body)];
            case 1:
                rs = _a.sent();
                req.count = 1;
                req.data = VendorResponse_1.default.format(rs);
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
exports.deleteVendor = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var obj, rs, e_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                obj = { id: req.params.id, isActive: false };
                return [4 /*yield*/, VendorCtrl_1.default.update(obj)];
            case 1:
                rs = _a.sent();
                req.count = 1;
                req.data = rs;
                next();
                return [3 /*break*/, 3];
            case 2:
                e_6 = _a.sent();
                next(e_6);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };

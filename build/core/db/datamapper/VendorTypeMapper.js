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
require("../index"); // for connnecting with DB
var mongoose_1 = __importDefault(require("mongoose"));
var AppError_1 = require("../../../Error/AppError");
var vendor_type_1 = __importDefault(require("../models/vendor_type"));
var VendorType_1 = __importDefault(require("../../model/VendorType"));
var VendorTypeMapper = /** @class */ (function () {
    function VendorTypeMapper() {
    }
    /***************** From Mongoose Model To Domain Model Start *****************/
    VendorTypeMapper._fromMongooseToModel = function (mm) {
        return new VendorType_1.default(mm.title, mm.image, mm._id, mm.isActive, mm.createdOn, mm.modifiedOn);
    };
    /***************** From Mongoose Model To Domain Model End *****************/
    /***************** From Domain Model To Mongoose Model Start *****************/
    VendorTypeMapper._fromModelToMongoose = function (dm) {
        var _id = dm.getId();
        var createdOn = dm.getCreatedOn();
        var modifiedOn = dm.getModifiedOn();
        var image = dm.getImage();
        var model = {
            _id: _id ? _id : new mongoose_1.default.Types.ObjectId(),
            title: dm.getTitle(),
            image: image ? image : null,
            isActive: dm.getStatus(),
            createdOn: createdOn != null ? createdOn : new Date(),
            modifiedOn: modifiedOn != null ? modifiedOn : new Date()
        };
        return model;
    };
    /***************** From Domain Model To Mongoose Model End *****************/
    VendorTypeMapper.count = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, vendor_type_1.default.countDocuments({})];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    }); };
    VendorTypeMapper.find = function (filter) { return __awaiter(void 0, void 0, void 0, function () {
        var searchFilter, offset, limit, regex, mongoResponse, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (filter.id) {
                        if (!mongoose_1.default.Types.ObjectId.isValid(filter.id))
                            throw new AppError_1.ValidationError("VendorType.id is not a valid Id");
                    }
                    searchFilter = {};
                    offset = 0;
                    limit = 200;
                    if (filter.offset)
                        offset = filter.offset;
                    if (filter.limit)
                        limit = filter.limit;
                    if (filter.search) {
                        regex = new RegExp(filter.search.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"), "gi");
                        searchFilter.$or = [
                            {
                                title: regex
                            }
                        ];
                    }
                    if (filter.id)
                        searchFilter._id = filter.id;
                    if (filter.title)
                        searchFilter.title = filter.title;
                    if (filter.isActive)
                        searchFilter.isActive = filter.isActive;
                    return [4 /*yield*/, vendor_type_1.default.find(searchFilter)
                            .skip(offset)
                            .limit(limit)
                            .exec()];
                case 1:
                    mongoResponse = _a.sent();
                    response = [];
                    if (mongoResponse.length == 0)
                        return [2 /*return*/, response];
                    response = mongoResponse.map(function (it) {
                        return VendorTypeMapper._fromMongooseToModel(it);
                    });
                    return [2 /*return*/, response];
            }
        });
    }); };
    VendorTypeMapper.save = function (dm) { return __awaiter(void 0, void 0, void 0, function () {
        var mongoResponse;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, vendor_type_1.default.create(VendorTypeMapper._fromModelToMongoose(dm))];
                case 1:
                    mongoResponse = _a.sent();
                    return [2 /*return*/, VendorTypeMapper.find({ id: mongoResponse._id })];
            }
        });
    }); };
    VendorTypeMapper.update = function (dm) { return __awaiter(void 0, void 0, void 0, function () {
        var mm, mongoResponse;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mm = VendorTypeMapper._fromModelToMongoose(dm);
                    delete mm._id;
                    return [4 /*yield*/, vendor_type_1.default.findByIdAndUpdate(dm.getId(), mm)];
                case 1:
                    mongoResponse = _a.sent();
                    if (mongoResponse)
                        return [2 /*return*/, VendorTypeMapper.find({ id: mongoResponse._id })];
                    else
                        throw new AppError_1.OtherError();
                    return [2 /*return*/];
            }
        });
    }); };
    VendorTypeMapper.hardDelete = function (id) { return __awaiter(void 0, void 0, void 0, function () {
        var mongoResponse;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!mongoose_1.default.Types.ObjectId.isValid(id))
                        throw new AppError_1.ValidationError("VendorType.id is not a valid Id");
                    return [4 /*yield*/, vendor_type_1.default.deleteOne({ _id: id })];
                case 1:
                    mongoResponse = _a.sent();
                    if (mongoResponse.ok == 1 && (mongoResponse.deletedCount) ? (mongoResponse.deletedCount > 0) ? true : false : false)
                        return [2 /*return*/, { message: "VendorType Deleted Successfully" }];
                    else
                        throw new AppError_1.OtherError("No VendorType Found fot this Id!");
                    return [2 /*return*/];
            }
        });
    }); };
    return VendorTypeMapper;
}());
exports.default = VendorTypeMapper;

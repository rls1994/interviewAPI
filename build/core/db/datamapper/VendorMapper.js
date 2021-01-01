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
var vendor_1 = __importDefault(require("../models/vendor"));
var VendorTypeMapper_1 = __importDefault(require("./VendorTypeMapper"));
var Vendor_1 = __importDefault(require("../../model/Vendor"));
var VendorMapper = /** @class */ (function () {
    function VendorMapper() {
    }
    /***************** From Mongoose Model To Domain Model Start *****************/
    VendorMapper._fromMongooseToModel = function (mm) { return __awaiter(void 0, void 0, void 0, function () {
        var vendorTypes, i, singleType, tmp;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    vendorTypes = [];
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < mm.type.length)) return [3 /*break*/, 4];
                    singleType = mm.type[i];
                    return [4 /*yield*/, VendorTypeMapper_1.default.find({ id: singleType })];
                case 2:
                    tmp = _a.sent();
                    if (tmp.length > 0)
                        vendorTypes.push(tmp[0]);
                    _a.label = 3;
                case 3:
                    i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/, new Vendor_1.default(mm.name, mm.phone, mm.state, mm.city, mm.area, vendorTypes, mm.address, mm.otherPhone, mm._id, mm.isActive, mm.createdOn, mm.modifiedOn)];
            }
        });
    }); };
    /***************** From Mongoose Model To Domain Model End *****************/
    /***************** From Domain Model To Mongoose Model Start *****************/
    VendorMapper._fromdmToMongoose = function (dm) {
        var _id = dm.getId();
        var createdOn = dm.getCreatedOn();
        var model = {
            name: dm.getName(),
            phone: dm.getPhone(),
            state: dm.getState(),
            city: dm.getCity(),
            area: dm.gteArea(),
            address: dm.getAddress(),
            otherPhone: dm.getOtherPhone(),
            type: dm.getType(),
            isActive: dm.getStatus(),
            _id: _id ? _id : new mongoose_1.default.Types.ObjectId(),
            createdOn: createdOn ? createdOn : new Date(),
            modifiedOn: new Date()
        };
        return model;
    };
    /***************** From Domain Model To Mongoose Model End *****************/
    VendorMapper.count = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, vendor_1.default.countDocuments({})];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    }); };
    VendorMapper.find = function (filter) { return __awaiter(void 0, void 0, void 0, function () {
        var searchFilter, offset, limit, regex, mongoResponse, response, i, tmp;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (filter.id) {
                        if (!mongoose_1.default.Types.ObjectId.isValid(filter.id))
                            throw new AppError_1.ValidationError("Vendor.id is not a valid Id");
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
                                name: regex
                            },
                            {
                                phone: regex
                            },
                            {
                                area: regex
                            },
                            {
                                city: regex
                            },
                            {
                                address: regex
                            }
                        ];
                    }
                    if (filter.type) {
                        searchFilter.type = {
                            $in: filter.type
                        };
                    }
                    if (filter.id)
                        searchFilter._id = filter.id;
                    if (filter.name)
                        searchFilter.name = filter.name;
                    if (filter.area) {
                        //searchFilter.area = filter.area;
                        searchFilter.$or = [
                            {
                                area: filter.area
                            },
                            {
                                area: "WHOLE BHIWANI"
                            },
                        ];
                    }
                    if (filter.city)
                        searchFilter.city = filter.city;
                    if (filter.state)
                        searchFilter.state = filter.state;
                    if (filter.address)
                        searchFilter.address = filter.address;
                    if (filter.isActive == true || filter.isActive == false)
                        searchFilter.isActive = filter.isActive;
                    else
                        searchFilter.isActive = true;
                    return [4 /*yield*/, vendor_1.default.find(searchFilter)
                            .skip(offset)
                            .limit(limit)
                            .sort({ area: 1 })
                            .exec()];
                case 1:
                    mongoResponse = _a.sent();
                    response = [];
                    if (mongoResponse.length == 0)
                        return [2 /*return*/, response];
                    i = 0;
                    _a.label = 2;
                case 2:
                    if (!(i < mongoResponse.length)) return [3 /*break*/, 5];
                    return [4 /*yield*/, VendorMapper._fromMongooseToModel(mongoResponse[i])];
                case 3:
                    tmp = _a.sent();
                    response.push(tmp);
                    _a.label = 4;
                case 4:
                    i++;
                    return [3 /*break*/, 2];
                case 5: return [2 /*return*/, response];
            }
        });
    }); };
    VendorMapper.save = function (dm) { return __awaiter(void 0, void 0, void 0, function () {
        var mongoResponse;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, vendor_1.default.create(VendorMapper._fromdmToMongoose(dm))];
                case 1:
                    mongoResponse = _a.sent();
                    return [2 /*return*/, VendorMapper.find({ id: mongoResponse._id })];
            }
        });
    }); };
    VendorMapper.update = function (dm) { return __awaiter(void 0, void 0, void 0, function () {
        var mm, mongoResponse;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mm = VendorMapper._fromdmToMongoose(dm);
                    delete mm._id;
                    return [4 /*yield*/, vendor_1.default.findByIdAndUpdate(dm.getId(), mm)];
                case 1:
                    mongoResponse = _a.sent();
                    if (mongoResponse)
                        return [2 /*return*/, VendorMapper.find({ id: mongoResponse._id })];
                    else
                        throw new AppError_1.OtherError();
                    return [2 /*return*/];
            }
        });
    }); };
    VendorMapper.hardDelete = function (id) { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!mongoose_1.default.Types.ObjectId.isValid(id))
                        throw new AppError_1.ValidationError("Vendor.id is not a valid Id");
                    return [4 /*yield*/, vendor_1.default.deleteOne({ _id: id }).exec()];
                case 1:
                    response = _a.sent();
                    if (response.ok == 1 && response.deletedCount
                        ? response.deletedCount > 0
                            ? true
                            : false
                        : false)
                        return [2 /*return*/, { message: "Vendor Deleted Successfully" }];
                    else
                        throw new AppError_1.OtherError("No Record Found !");
                    return [2 /*return*/];
            }
        });
    }); };
    return VendorMapper;
}());
exports.default = VendorMapper;

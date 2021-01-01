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
var order_1 = __importDefault(require("../models/order"));
var Order_1 = __importDefault(require("../../model/Order"));
var UserMapper_1 = __importDefault(require("./UserMapper"));
var VendorMapper_1 = __importDefault(require("./VendorMapper"));
var OrderMapper = /** @class */ (function () {
    function OrderMapper() {
    }
    /***************** From Domain Model To Mongoose Model End *****************/
    OrderMapper.generateNextId = function () {
        return __awaiter(this, void 0, void 0, function () {
            var order, oldValue, raw, number, z, width, n, newValue;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, order_1.default.find({}).sort({ _id: -1 }).limit(1)];
                    case 1:
                        order = _a.sent();
                        oldValue = "ORD-0000000";
                        if (order.length > 0) {
                            if (order[0].orderId)
                                oldValue = order[0].orderId;
                        }
                        raw = oldValue.split("-");
                        number = parseInt(raw[1]);
                        number++;
                        z = '0';
                        width = 8;
                        n = number + '';
                        n = n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
                        newValue = raw[0] + "-" + n;
                        return [2 /*return*/, newValue];
                }
            });
        });
    };
    /***************** From Mongoose Model To Domain Model Start *****************/
    OrderMapper._fromMongooseToModel = function (mm) { return __awaiter(void 0, void 0, void 0, function () {
        var user, vendor;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, UserMapper_1.default.find({ id: (mm.user).toString() })];
                case 1:
                    user = _a.sent();
                    return [4 /*yield*/, VendorMapper_1.default.find({ id: (mm.vendor).toString() })];
                case 2:
                    vendor = _a.sent();
                    return [2 /*return*/, new Order_1.default(mm.message, user[0], vendor[0], mm.deliveryAddress, mm.image, mm.orderId, mm._id, mm.createdOn, mm.modifiedOn)];
            }
        });
    }); };
    /***************** From Mongoose Model To Domain Model End *****************/
    /***************** From Domain Model To Mongoose Model Start *****************/
    OrderMapper._fromdmToMongoose = function (dm) { return __awaiter(void 0, void 0, void 0, function () {
        var orderId, _id, createdOn, model;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, OrderMapper.generateNextId()];
                case 1:
                    orderId = _a.sent();
                    _id = dm.getId();
                    createdOn = dm.getCreatedOn();
                    model = {
                        message: dm.getMessage(),
                        user: dm.getUser(),
                        vendor: dm.getVendor(),
                        image: dm.getImage(),
                        orderId: orderId,
                        deliveryAddress: dm.getDeliveryAddress(),
                        _id: _id ? _id : new mongoose_1.default.Types.ObjectId(),
                        createdOn: createdOn ? createdOn : new Date(),
                        modifiedOn: new Date()
                    };
                    return [2 /*return*/, model];
            }
        });
    }); };
    OrderMapper.count = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, order_1.default.countDocuments({})];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    }); };
    OrderMapper.find = function (filter) { return __awaiter(void 0, void 0, void 0, function () {
        var searchFilter, offset, limit, mongoResponse, response, i, tmp;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (filter.id) {
                        if (!mongoose_1.default.Types.ObjectId.isValid(filter.id))
                            throw new AppError_1.ValidationError("Order.id is not a valid Id");
                    }
                    searchFilter = {};
                    offset = 0;
                    limit = 200;
                    if (filter.offset)
                        offset = filter.offset;
                    if (filter.limit)
                        limit = filter.limit;
                    // if (filter.search) {
                    //     let regex = new RegExp(
                    //         filter.search.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"),
                    //         "gi"
                    //     );
                    // }
                    if (filter.id)
                        searchFilter._id = filter.id;
                    if (filter.orderId)
                        searchFilter._orderId = filter.orderId;
                    if (filter.user)
                        searchFilter.user = filter.user;
                    if (filter.vendor)
                        searchFilter.vendor = filter.vendor;
                    return [4 /*yield*/, order_1.default.find(searchFilter)
                            .skip(offset)
                            .limit(limit)
                            .sort({ createdOn: -1 })
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
                    return [4 /*yield*/, OrderMapper._fromMongooseToModel(mongoResponse[i])];
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
    OrderMapper.save = function (dm) { return __awaiter(void 0, void 0, void 0, function () {
        var mongoResponse, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _b = (_a = order_1.default).create;
                    return [4 /*yield*/, OrderMapper._fromdmToMongoose(dm)];
                case 1: return [4 /*yield*/, _b.apply(_a, [_c.sent()])];
                case 2:
                    mongoResponse = _c.sent();
                    return [2 /*return*/, OrderMapper.find({ id: mongoResponse._id })];
            }
        });
    }); };
    OrderMapper.update = function (dm) { return __awaiter(void 0, void 0, void 0, function () {
        var mm, mongoResponse;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, OrderMapper._fromdmToMongoose(dm)];
                case 1:
                    mm = _a.sent();
                    delete mm._id;
                    return [4 /*yield*/, order_1.default.findByIdAndUpdate(dm.getId(), mm)];
                case 2:
                    mongoResponse = _a.sent();
                    if (mongoResponse)
                        return [2 /*return*/, OrderMapper.find({ id: mongoResponse._id })];
                    else
                        throw new AppError_1.OtherError();
                    return [2 /*return*/];
            }
        });
    }); };
    OrderMapper.getCountByDate = function () { return __awaiter(void 0, void 0, void 0, function () {
        var rs;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, order_1.default.aggregate([
                        {
                            $group: {
                                _id: {
                                    day: { $dayOfMonth: "$createdOn" },
                                    month: { $month: "$createdOn" },
                                    year: { $year: "$createdOn" }
                                },
                                count: { $sum: 1 },
                                date: { $first: "$createdOn" }
                            }
                        },
                        {
                            $project: {
                                date: {
                                    $dateToString: { format: "%Y-%m-%d", date: "$date" }
                                },
                                count: 1,
                                _id: 0
                            }
                        }
                    ])];
                case 1:
                    rs = _a.sent();
                    return [2 /*return*/, rs];
            }
        });
    }); };
    return OrderMapper;
}());
exports.default = OrderMapper;

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
var VendorMapper_1 = __importDefault(require("../db/datamapper/VendorMapper"));
var AppError_1 = require("../../Error/AppError");
var Vendor_1 = __importDefault(require("../model/Vendor"));
var csvToJson_1 = __importDefault(require("../lib/csvToJson"));
var VendorTypeCtrl_1 = __importDefault(require("./VendorTypeCtrl"));
var VendorCtrl = /** @class */ (function () {
    function VendorCtrl() {
    }
    VendorCtrl.add = function (data) { return __awaiter(void 0, void 0, void 0, function () {
        var dm, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!data.name)
                        throw new AppError_1.ValidationError("Vendor.Name is Required");
                    if (!data.state)
                        throw new AppError_1.ValidationError("Vendor.State is Required");
                    if (!data.city)
                        throw new AppError_1.ValidationError("Vendor.City is Required");
                    if (!data.area)
                        throw new AppError_1.ValidationError("Vendor.Area is Required");
                    if (!data.phone)
                        throw new AppError_1.ValidationError("Vendor.Phone is Required");
                    dm = new Vendor_1.default(data.name, (data.phone).replace(/[!@#$%^&*,?"'.():;{}|<>_+=\-\[\]\\/\s]+/g, ""), data.state, data.city, data.area, data.type, data.address ? data.address : null, data.otherPhone ? data.otherPhone : null);
                    return [4 /*yield*/, VendorMapper_1.default.save(dm)];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, response];
            }
        });
    }); };
    VendorCtrl.get = function (filter) { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, VendorMapper_1.default.find(filter)];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, response];
            }
        });
    }); };
    VendorCtrl.count = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, VendorMapper_1.default.count()];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    }); };
    VendorCtrl.update = function (Data) { return __awaiter(void 0, void 0, void 0, function () {
        var olddm, oldTypes, vendoroldType, dm, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!Data.id)
                        throw new AppError_1.ValidationError("Vendor Id is Required");
                    return [4 /*yield*/, VendorCtrl.get({ id: Data.id })];
                case 1:
                    olddm = (_a.sent())[0];
                    oldTypes = [];
                    vendoroldType = olddm.getType();
                    vendoroldType.forEach(function (it) {
                        var tmp = it.getId();
                        oldTypes.push(tmp);
                    });
                    dm = new Vendor_1.default(Data.name ? Data.name : olddm.getName(), Data.phone ? (Data.phone).replace(/[!@#$%^&*,?"'.():;{}|<>_+=\-\[\]\\/\s]+/g, "") : olddm.getPhone(), Data.state ? Data.state : olddm.getState(), Data.city ? Data.city : olddm.getCity(), Data.area ? Data.area : olddm.gteArea(), Data.type ? Data.type : oldTypes, Data.address ? Data.address : olddm.getAddress(), Data.otherPhone ? Data.otherPhone : olddm.getOtherPhone(), Data.id, (Data.isActive == true || Data.isActive == false) ? Data.isActive : olddm.getStatus(), olddm.getCreatedOn());
                    return [4 /*yield*/, VendorMapper_1.default.update(dm)];
                case 2:
                    response = _a.sent();
                    return [2 /*return*/, response];
            }
        });
    }); };
    VendorCtrl.delete = function (Id) { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, VendorMapper_1.default.hardDelete(Id)];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, response];
            }
        });
    }); };
    VendorCtrl.bulkUpload = function (filelocation) { return __awaiter(void 0, void 0, void 0, function () {
        var jsonData, dataToSave, errorData, allVendorTypesData, vendorTypes, i, vendorData, rowNumber, rowData, rawType, tmpVendorType, typeId, i_1, j, fromExcel, fromDb, rawPhone, otherPhoneNos, savedVendors, i, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, csvToJson_1.default.convert(filelocation)];
                case 1:
                    jsonData = _a.sent();
                    dataToSave = [];
                    errorData = [];
                    return [4 /*yield*/, VendorTypeCtrl_1.default.get({})];
                case 2:
                    allVendorTypesData = _a.sent();
                    vendorTypes = [];
                    allVendorTypesData.map(function (it) {
                        vendorTypes.push({ id: it.getId(), title: it.getTitle() });
                    });
                    for (i = 0; i < jsonData.length; i++) {
                        vendorData = {};
                        rowNumber = i + 2;
                        rowData = jsonData[i];
                        if (rowData.Name == undefined || rowData.Name == "")
                            errorData.push("Name cannot be Empty. Error" +
                                " at Row No.: " + rowNumber);
                        else
                            vendorData.name = rowData.Name;
                        if (rowData.Type) {
                            rawType = rowData.Type;
                            rawType = rawType.replace(/\s/g, "");
                            tmpVendorType = rawType.split(",");
                            typeId = [];
                            for (i_1 = 0; i_1 < vendorTypes.length; i_1++) {
                                for (j = 0; j < tmpVendorType.length; j++) {
                                    fromExcel = (tmpVendorType[j]).replace(/\s/g, "").toLowerCase();
                                    fromDb = (vendorTypes[i_1].title).replace(/\s/g, "").toLowerCase();
                                    if (fromDb == fromExcel) {
                                        typeId.push(vendorTypes[i_1].id);
                                    }
                                }
                            }
                            if (typeId.length == 0)
                                errorData.push("Invalid Type Name. Please add The Type First. Error at Row No.: " + rowNumber);
                            else
                                vendorData.type = typeId;
                        }
                        if (rowData.OtherPhone) {
                            rawPhone = rowData.OtherPhone;
                            rawPhone = rawPhone.replace(/\s/g, "");
                            otherPhoneNos = rawPhone.split(",");
                            vendorData.otherPhone = otherPhoneNos;
                        }
                        if (rowData.Phone == undefined || rowData.Phone == "")
                            errorData.push("Phone cannot be Empty. Error" +
                                " at Row No.: " + rowNumber);
                        else {
                            vendorData.phone = (rowData.Phone).replace(/[!@#$%^&*,?"'.():;{}|<>_+=\-\[\]\\/\s]+/g, "");
                        }
                        if (rowData.State == undefined || rowData.State == "")
                            errorData.push("State cannot be Empty. Error" +
                                " at Row No.: " + rowNumber);
                        else
                            vendorData.state = rowData.State;
                        if (rowData.City == undefined || rowData.City == "")
                            errorData.push("City cannot be Empty. Error" +
                                " at Row No.: " + rowNumber);
                        else
                            vendorData.city = rowData.City;
                        if (rowData.Area == undefined || rowData.Area == "")
                            errorData.push("Area cannot be Empty. Error" +
                                " at Row No.: " + rowNumber);
                        else
                            vendorData.area = rowData.Area;
                        if (rowData.Address)
                            vendorData.address = rowData.Address;
                        dataToSave.push(vendorData);
                    }
                    if (errorData.length > 0)
                        throw new AppError_1.ValidationError("Please Resolve the Errors First", errorData);
                    savedVendors = [];
                    i = 0;
                    _a.label = 3;
                case 3:
                    if (!(i < dataToSave.length)) return [3 /*break*/, 6];
                    return [4 /*yield*/, VendorCtrl.add(dataToSave[i])];
                case 4:
                    res = _a.sent();
                    savedVendors.push(res[0]);
                    _a.label = 5;
                case 5:
                    i++;
                    return [3 /*break*/, 3];
                case 6: return [2 /*return*/, savedVendors];
            }
        });
    }); };
    return VendorCtrl;
}());
exports.default = VendorCtrl;

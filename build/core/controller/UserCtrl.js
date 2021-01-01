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
var UserMapper_1 = __importDefault(require("../db/datamapper/UserMapper"));
var AppError_1 = require("../../Error/AppError");
var User_1 = __importDefault(require("../model/User"));
var Redis_1 = __importDefault(require("../lib/Redis"));
var HashAndComparePassword_1 = __importDefault(require("../lib/HashAndComparePassword"));
var AuthenticationToken_1 = __importDefault(require("../lib/AuthenticationToken"));
var SmsSender_1 = __importDefault(require("../lib/SmsSender"));
var UserCtrl = /** @class */ (function () {
    function UserCtrl() {
    }
    UserCtrl.phoneValidator = function (phone) {
        if (!phone)
            throw new AppError_1.ValidationError("User Phone Number is Required");
        phone = phone.replace(/[!@#$%^&*,?"'.():;{}|<>_+=\-\[\]\\/\s]+/g, "");
        if (phone.length != 10)
            throw new AppError_1.ValidationError("Invalid Phone number Entered");
        return phone;
    };
    UserCtrl.add = function (data) { return __awaiter(void 0, void 0, void 0, function () {
        var dm, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!data.name)
                        throw new AppError_1.ValidationError("User.Name is Required");
                    if (!data.state)
                        data.state = "Haryana";
                    if (!data.city)
                        data.city = "Bhiwani";
                    if (!data.password)
                        throw new AppError_1.ValidationError("User.Password is Required");
                    // if(!data.image) throw new ValidationError("User.Image is Required");
                    if (!data.phone)
                        throw new AppError_1.ValidationError("User.Phone is Required");
                    else
                        data.phone = UserCtrl.phoneValidator(data.phone);
                    dm = new User_1.default(data.name, (data.phone).replace(/[!@#$%^&*,?"'.():;{}|<>_+=\-\[\]\\/\s]+/g, ""), data.state, data.city, { data: data.password }, data.image || null, data.area ? data.area : null, data.address ? data.address : null, true);
                    return [4 /*yield*/, UserMapper_1.default.save(dm)];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, response];
            }
        });
    }); };
    UserCtrl.get = function (filter) { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, UserMapper_1.default.find(filter)];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, response];
            }
        });
    }); };
    UserCtrl.count = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, UserMapper_1.default.count()];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    }); };
    UserCtrl.update = function (Data) { return __awaiter(void 0, void 0, void 0, function () {
        var olddm, dm, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!Data.id)
                        throw new AppError_1.ValidationError("User Id is Required");
                    return [4 /*yield*/, UserCtrl.get({ id: Data.id })];
                case 1:
                    olddm = (_a.sent())[0];
                    dm = new User_1.default(Data.name ? Data.name : olddm.getName(), olddm.getPhone(), Data.state ? Data.state : olddm.getState(), Data.city ? Data.city : olddm.getCity(), Data.password ? { data: Data.password } : { data: "....." }, Data.image ? Data.image : olddm.getImage(), Data.area ? Data.area : olddm.getArea(), Data.address ? Data.address : olddm.getAddress(), (Data.isVerified == true || Data.isVerified == false) ? Data.isVerified : olddm.getVerificationStatus(), Data.id, (Data.isActive == true || Data.isActive == false) ? Data.isActive : olddm.getStatus(), olddm.getCreatedOn());
                    return [4 /*yield*/, UserMapper_1.default.update(dm)];
                case 2:
                    response = _a.sent();
                    return [2 /*return*/, response];
            }
        });
    }); };
    UserCtrl.delete = function (Id) { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, UserMapper_1.default.hardDelete(Id)];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, response];
            }
        });
    }); };
    UserCtrl.saveOtp = function (userPhone, otp) { return __awaiter(void 0, void 0, void 0, function () {
        var rs;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Redis_1.default.setOtp(userPhone, otp)];
                case 1:
                    rs = _a.sent();
                    return [2 /*return*/, rs];
            }
        });
    }); };
    UserCtrl.checkOtp = function (userPhone, otp) { return __awaiter(void 0, void 0, void 0, function () {
        var rs;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Redis_1.default.getOtp(userPhone)];
                case 1:
                    rs = _a.sent();
                    if (rs == otp)
                        return [2 /*return*/, true];
                    else
                        return [2 /*return*/, false];
                    return [2 /*return*/];
            }
        });
    }); };
    UserCtrl.otpGenerator = function () {
        var digits = '0123456789';
        var OTP = '';
        for (var i = 0; i < 4; i++) {
            OTP += digits[Math.floor(Math.random() * 10)];
        }
        return OTP;
    };
    UserCtrl.register = function (data) { return __awaiter(void 0, void 0, void 0, function () {
        var userPhone, userCheck, userResponse;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!data.phone)
                        throw new AppError_1.ValidationError("User Phone is Required");
                    userPhone = UserCtrl.phoneValidator(data.phone);
                    data.phone = userPhone;
                    return [4 /*yield*/, UserCtrl.get({ phone: userPhone })];
                case 1:
                    userCheck = _a.sent();
                    if (userCheck.length > 0)
                        throw new AppError_1.ValidationError("User Already Exists with the Given Number");
                    return [4 /*yield*/, UserCtrl.add(data)];
                case 2:
                    userResponse = _a.sent();
                    if (userResponse.length == 0)
                        throw new AppError_1.OtherError("Something went wrong while Registration");
                    // let otp = UserCtrl.otpGenerator();
                    // console.log("In User Ctrl Register Fun OTP: "+ otp);
                    // let otpSaveRes = await UserCtrl.saveOtp(userPhone, otp);
                    // if(otpSaveRes){
                    return [2 /*return*/, userResponse];
            }
        });
    }); };
    UserCtrl.generateOtp = function (userPhone) { return __awaiter(void 0, void 0, void 0, function () {
        var user, otp, otpMessage, smsSendReport, otpSaveRes;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userPhone = UserCtrl.phoneValidator(userPhone);
                    return [4 /*yield*/, UserCtrl.get({ phone: userPhone })];
                case 1:
                    user = _a.sent();
                    if (user.length == 0)
                        throw new AppError_1.NotFoundError("No User Found");
                    otp = UserCtrl.otpGenerator();
                    otpMessage = otp + " is Your OTP for App Account Verification.";
                    return [4 /*yield*/, SmsSender_1.default.send(userPhone, otpMessage)];
                case 2:
                    smsSendReport = _a.sent();
                    if (!smsSendReport)
                        throw new AppError_1.OtherError("Something went wrong while Sending OTP");
                    return [4 /*yield*/, UserCtrl.saveOtp(userPhone, otp)];
                case 3:
                    otpSaveRes = _a.sent();
                    if (otpSaveRes) {
                        return [2 /*return*/, user];
                    }
                    else {
                        throw new AppError_1.OtherError("Something went wrong while OTP generation");
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    UserCtrl.verifyUser = function (phone, otp) { return __awaiter(void 0, void 0, void 0, function () {
        var user, check, userRes, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    phone = UserCtrl.phoneValidator(phone);
                    return [4 /*yield*/, UserCtrl.get({ phone: phone })];
                case 1:
                    user = _a.sent();
                    if (user.length == 0)
                        throw new AppError_1.NotFoundError("No User Exists");
                    return [4 /*yield*/, UserCtrl.checkOtp(phone, otp)];
                case 2:
                    check = _a.sent();
                    if (!check)
                        throw new AppError_1.ValidationError("Invalid OTP");
                    return [4 /*yield*/, UserCtrl.update({ id: user[0].getId(), isVerified: true })];
                case 3:
                    userRes = _a.sent();
                    token = AuthenticationToken_1.default.create({ id: user[0].getId(), phone: user[0].getPhone() });
                    return [2 /*return*/, {
                            token: token,
                            user: userRes[0]
                        }];
            }
        });
    }); };
    UserCtrl.userLogin = function (phone, password) { return __awaiter(void 0, void 0, void 0, function () {
        var user, pwdRes, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    phone = UserCtrl.phoneValidator(phone);
                    return [4 /*yield*/, UserCtrl.get({ phone: phone })];
                case 1:
                    user = _a.sent();
                    if (user.length == 0)
                        throw new AppError_1.ValidationError("Invalid Credentials");
                    pwdRes = HashAndComparePassword_1.default.comparePassword(password, user[0].getPassword());
                    if (!pwdRes)
                        throw new AppError_1.ValidationError("Invalid Credentials");
                    if (user[0].getVerificationStatus() == false)
                        return [2 /*return*/, {
                                token: null,
                                user: user[0]
                            }];
                    token = AuthenticationToken_1.default.create({ id: user[0].getId(), phone: user[0].getPhone() });
                    return [2 /*return*/, {
                            token: token,
                            user: user[0]
                        }];
            }
        });
    }); };
    UserCtrl.forgotPassword = function (phone) { return __awaiter(void 0, void 0, void 0, function () {
        var user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    phone = UserCtrl.phoneValidator(phone);
                    return [4 /*yield*/, UserCtrl.get({ phone: phone })];
                case 1:
                    user = _a.sent();
                    if (user.length == 0)
                        throw new AppError_1.NotFoundError("No User Found");
                    // let otp = UserCtrl.otpGenerator();
                    // let otpSaveRes = await UserCtrl.saveOtp(phone, otp);
                    // if(otpSaveRes){
                    return [2 /*return*/, user];
            }
        });
    }); };
    UserCtrl.changePassword = function (phone, oldPassword, newPassword) { return __awaiter(void 0, void 0, void 0, function () {
        var user, pwdRes, userResponse;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    phone = UserCtrl.phoneValidator(phone);
                    return [4 /*yield*/, UserCtrl.get({ phone: phone })];
                case 1:
                    user = _a.sent();
                    if (user.length == 0)
                        throw new AppError_1.NotFoundError("No User Found");
                    pwdRes = HashAndComparePassword_1.default.comparePassword(oldPassword, user[0].getPassword());
                    if (!pwdRes)
                        throw new AppError_1.ValidationError("Invalid Password");
                    return [4 /*yield*/, UserCtrl.update({ id: user[0].getId(), password: newPassword })];
                case 2:
                    userResponse = _a.sent();
                    return [2 /*return*/, userResponse];
            }
        });
    }); };
    UserCtrl.getStats = function () { return __awaiter(void 0, void 0, void 0, function () {
        var rs;
        return __generator(this, function (_a) {
            rs = UserMapper_1.default.getCountByDate();
            return [2 /*return*/, rs];
        });
    }); };
    return UserCtrl;
}());
exports.default = UserCtrl;

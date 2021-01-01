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
Object.defineProperty(exports, "__esModule", { value: true });
require("../../../modulepatch/expresspatch");
// export const sendmsg = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//
//         let data = await SmsSender.send(req.body.phone,req.body.message)
//         req.data = data;
//         req.count = 1;
//         next();
//     }
//     catch (e) {
//         next(e)
//     }
// };
/*
export const get = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let data = await UserCtrl.get(req.body);
        req.data = UserResponse.format(data);
        req.count = data.length;
        next();
    }
    catch (e) {
        next(e)
    }
};

export const add = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let rs = await UserCtrl.add(req.body);
        req.data = UserResponse.format(rs);
        req.count = rs.length;
        next()
    }
    catch (e) {
        next(e)
    }
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let obj = {id:req.params.id,isActive: false}
        let rs = await UserCtrl.update(obj);
        req.count = 1;
        req.data = rs
        next()
    }
    catch (e) {
        next(e)
    }
};

*/
/*
export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let data = await UserCtrl.register(req.body);
        req.data = UserResponse.format(data);
        req.count = data.length;
        next();
    }
    catch (e) {
        next(e)
    }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if(!req.body.phone) throw new ValidationError("User Phone is Required");
        if(!req.body.password) throw new ValidationError("User Password is Required");
        let data = await UserCtrl.userLogin(req.body.phone, req.body.password);
        req.data = [
            data.token,
            UserResponse.format([data.user])[0],
        ]
        req.count = 1;
        next();
    }
    catch (e) {
        next(e)
    }
};

export const generateOtp = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if(!req.body.phone) throw new ValidationError("User Phone is Required");
        let data = await UserCtrl.generateOtp(req.body.phone);
        req.data = UserResponse.format(data);
        req.count = 1;
        next();
    }
    catch (e) {
        next(e)
    }
}

export const verify = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if(!req.body.phone) throw new ValidationError("User Phone is Required");
        if(!req.body.otp) throw new ValidationError("OTP is Required");
        let data = await UserCtrl.verifyUser(req.body.phone, req.body.otp);
        req.data = [
            data.token,
            UserResponse.format([data.user])[0],
        ];
        req.count = 1;
        next();
    }
    catch (e) {
        next(e)
    }
};

export const forgotPassword = async (req: Request, res: Response, next: NextFunction) =>{
    try{
        if(!req.body.phone) throw new ValidationError("User Phone is Required");
        let data = await UserCtrl.forgotPassword(req.body.phone);
        req.data = UserResponse.format(data);
        req.count = 1;
        next();
    }
    catch (e) {
        next(e)
    }
}



export const update = async (req: Request, res: Response, next: NextFunction) => {
    try {
        req.body.id = req.tokenInfo?.id;
        req.body.phone = req.tokenInfo?.phone;
        if(req.body.password) delete req.body.password;
        let rs = await UserCtrl.update(req.body);
        req.count = 1;
        req.data = UserResponse.format(rs);
        next()
    }
    catch (e) {
        next(e)
    }
};

export const changePassword = async (req: Request, res: Response, next: NextFunction) =>{
    try{
        if(!req.body.oldPassword) throw new ValidationError("Old Password is Required");
        if(!req.body.newPassword) throw new ValidationError("New Password is Required");

        req.body.id = req.tokenInfo?.id;
        req.body.phone = req.tokenInfo?.phone;
        let data = await UserCtrl.changePassword(req.body.phone, req.body.oldPassword, req.body.newPassword);
        req.data = UserResponse.format(data);
        req.count = 1;
        next();
    }
    catch (e) {
        next(e)
    }
}

*/
exports.getStats = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        try {
        }
        catch (e) {
            next(e);
        }
        return [2 /*return*/];
    });
}); };

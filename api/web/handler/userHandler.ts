import {NextFunction, Response, Request } from 'express'
import '../../../modulepatch/expresspatch'
import UserCtrl from '../../../core/controller/UserCtrl';
import UserResponse from '../../responseFormatter/UserResponse';
import {ValidationError} from "../../../Error/AppError";


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

export const getStats = async (req: Request, res: Response, next: NextFunction) => {
    try{

    }
    catch (e) {
        next(e);
    }
}
import { Request, Response, NextFunction } from "express";
import dotenv from 'dotenv'
import {AuthenticationError} from "../../../Error/AppError";
dotenv.config();


export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
    try {

        const token = req.query['x-access-token'] || req.headers['x-access-token'];
        if(!token)  res.status(403).send({success: false, message: "No token Provided"});
        // const decoded = jwt.verify(token, "secret");
        if(token != process.env.ADMIN_TOKEN) throw new AuthenticationError("Authentication Failed");




        // const token = req.headers.authorization!.split(" ")[1];
        // let decoded = AuthenticationToken.verify(token);
        // if(typeof decoded != "boolean")
        //     req.tokenInfo = {id: decoded.id, phone: decoded.phone};
        // else throw new AuthenticationError("Authentication Failed");
        //req.tokenInfo = {id:"5e7f0532f85e61fedca2a545",phone: "9729721997"}
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Authentication failed',
            Error: error
        });
    }
};

// const token = jwt.sign(
//     {
//         permissions: ['a','b','c'],
//         Name:"Ram",
//     },
//     process.env.AUTH_SECRET!
//     ,
//     { expiresIn: 99999}
// );
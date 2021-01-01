import {NextFunction, Response, Request } from 'express'
import '../../../modulepatch/expresspatch'
import VendorCtrl from '../../../core/controller/VendorCtrl';
import VendorResponse from '../../responseFormatter/VendorResponse';
import {ValidationError} from "../../../Error/AppError";

export const get = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let data = await VendorCtrl.get(req.body);
        req.data = VendorResponse.format(data);
        req.count = data.length;
        next();
    }
    catch (e) {
        next(e)
    }
};

export const getArea = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let filter = {state:"Haryana",city:"Bhiwani"};
        let data = await VendorCtrl.get(filter);
        let areas = VendorResponse.formatAndGetArea(data);
        req.data = areas;
        req.count = areas.length;
        next();
    }
    catch (e) {
        next(e)
    }
};


export const add = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let rs = await VendorCtrl.add(req.body);
        req.data = VendorResponse.format(rs);
        req.count = rs.length;
        next()
    }
    catch (e) {
        next(e)
    }
};

export const bulkUpload = async (req: Request, res: Response, next: NextFunction) => {
    try{
        let file = req.file;
        if(!file) throw new ValidationError("Vendor CSV Sheet is Required!");
        let res = await VendorCtrl.bulkUpload(file.path);
        req.data = VendorResponse.format(res);
        req.count = res.length;
        next();
    }
    catch(e){
        next(e);
    }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let rs = await VendorCtrl.update(req.body);
        req.count = 1;
        req.data = VendorResponse.format(rs);
        next()
    }
    catch (e) {
        next(e)
    }
};

export const deleteVendor = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let obj = {id:req.params.id,isActive: false}
        let rs = await VendorCtrl.update(obj);
        req.count = 1;
        req.data = rs
        next()
    }
    catch (e) {
        next(e)
    }
};

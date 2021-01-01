import {NextFunction, Response, Request } from 'express'
import '../../../modulepatch/expresspatch'
import VendorCtrl from '../../../core/controller/VendorCtrl';
import VendorResponse from '../../responseFormatter/VendorResponse';

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
import {NextFunction, Response, Request } from 'express'
import '../../../modulepatch/expresspatch'
import VendorTypeCtrl from '../../../core/controller/VendorTypeCtrl';
import VendorTypeResponse from '../../responseFormatter/VendorTypeResponse';

export const getType = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let data = await VendorTypeCtrl.get(req.body);
        req.data = VendorTypeResponse.format(data);
        req.count = data.length;
        next();
    }
    catch (e) {
        next(e)
    }
};

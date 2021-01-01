import {NextFunction, Response, Request } from 'express'
import '../../../modulepatch/expresspatch'
import OrderCtrl from '../../../core/controller/OrderCtrl';
import OrderResponse from '../../responseFormatter/OrderResponse';

export const get = async (req: Request, res: Response, next: NextFunction) => {
    try {
        req.body.user = req.tokenInfo?.id;
        let data = await OrderCtrl.get(req.body);
        req.data = OrderResponse.format(data);
        req.count = data.length;
        next();
    }
    catch (e) {
        next(e)
    }
};

export const add = async (req: Request, res: Response, next: NextFunction) => {
    try {
        req.body.user = req.tokenInfo?.id;
        let rs = await OrderCtrl.add(req.body);
        req.data = OrderResponse.format(rs);
        req.count = rs.length;
        next()
    }
    catch (e) {
        next(e)
    }
};

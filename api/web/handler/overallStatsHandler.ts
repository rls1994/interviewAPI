import {NextFunction, Response, Request } from 'express'
import '../../../modulepatch/expresspatch'
import UserCtrl from "../../../core/controller/UserCtrl";
import OrderCtrl from "../../../core/controller/OrderCtrl";

export const getstats = async (req: Request, res: Response, next: NextFunction) => {
    try{
        let Usersdata = await UserCtrl.getStats();
        let OrdersData = await OrderCtrl.getStats();

        Usersdata.sort((a:{date:string, count: number}, b:{date:string, count: number}) => (new Date(b.date).getDate() - (new Date(a.date).getDate())))
        OrdersData.sort((a:{date:string, count: number}, b:{date:string, count: number}) => (new Date(b.date).getDate() - (new Date(a.date).getDate())))
        let totalUsers = 0;
        Usersdata.forEach(it=>{
            totalUsers = totalUsers + it.count;
        });
        let totalOrders = 0;
        OrdersData.forEach(it=>{
            totalOrders = totalOrders + it.count;
        })
        req.data = {
            users: {
                total_count: totalUsers,
                report: Usersdata
            },
            orders: {
                total_count: totalOrders,
                report: OrdersData
            }
        };
        req.count = 2;
        next();
    }
    catch (e) {
        next(e);
    }
}


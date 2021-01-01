import "../index"; // for connnecting with DB
import mongoose from "mongoose";
import {
    OtherError,
    ValidationError
} from "../../../Error/AppError";
import OrderMongoose, { IOrderMongoose } from "../models/order";
import { OrderFilter } from '../../filterInterface/OrderFilter';
import Order from "../../model/Order";
import UserMapper from "./UserMapper";
import VendorMapper from "./VendorMapper";
import UserMongoose from "../models/user";

class OrderMapper {
    /***************** From Mongoose Model To Domain Model Start *****************/
    static _fromMongooseToModel = async (mm: IOrderMongoose) => {

        let user = await UserMapper.find({id:(mm.user).toString()});

        let vendor = await VendorMapper.find({id: (mm.vendor).toString()});
        return new Order(
            mm.message,
            user[0],
            vendor[0],
            mm.deliveryAddress,
            mm.image,
            mm.orderId,
            mm._id,
            mm.createdOn,
            mm.modifiedOn
        )
    };
    /***************** From Mongoose Model To Domain Model End *****************/

    /***************** From Domain Model To Mongoose Model Start *****************/
    private static _fromdmToMongoose = async (dm: Order) => {

        let orderId = await OrderMapper.generateNextId();
        let _id = dm.getId();
        let createdOn = dm.getCreatedOn();
        const model: IOrderMongoose = {
            message: dm.getMessage(),
            user: dm.getUser(),
            vendor: dm.getVendor(),
            image: dm.getImage(),
            orderId: orderId,
            deliveryAddress: dm.getDeliveryAddress(),
            _id: _id ? _id : new mongoose.Types.ObjectId(),
            createdOn: createdOn ? createdOn : new Date(),
            modifiedOn: new Date()
        }
        return model;
    };
    /***************** From Domain Model To Mongoose Model End *****************/

    private static async generateNextId() {
        // let orderCount = await OrderMapper.count();
        // let order: IOrderMongoose[] = [];
        //if(orderCount>0)
        let order = await OrderMongoose.find({}).sort({_id: -1}).limit(1);
        let oldValue = "ORD-0000000";
        if(order.length >0){
            if(order[0].orderId)
                oldValue = order[0].orderId;
        }
        let raw = oldValue.split("-");
        let number = parseInt(raw[1]);
        number++;
        //let newValue = `${raw[0]}-${number}`;

        let z = '0';
        let width = 8;
        let n = number + '';
        n =  n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
        let newValue = `${raw[0]}-${n}`;
        return newValue;
    }

    static count = async () => {
        return await OrderMongoose.countDocuments({});
    };

    static find = async (filter: OrderFilter) => {

        if (filter.id) {
            if (!mongoose.Types.ObjectId.isValid(filter.id))
                throw new ValidationError("Order.id is not a valid Id");
        }
        let searchFilter: any = {};
        let offset: number = 0;
        let limit: number = 200;
        if (filter.offset) offset = filter.offset;
        if (filter.limit) limit = filter.limit;
        // if (filter.search) {
        //     let regex = new RegExp(
        //         filter.search.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"),
        //         "gi"
        //     );
        // }
        if (filter.id) searchFilter._id = filter.id;
        if (filter.orderId) searchFilter._orderId = filter.orderId;
        if (filter.user) searchFilter.user = filter.user;
        if (filter.vendor) searchFilter.vendor = filter.vendor;
        const mongoResponse = await OrderMongoose.find(searchFilter)
            .skip(offset)
            .limit(limit)
            .sort({createdOn:-1})
            .exec();

        let response: Order[] = [];
        if (mongoResponse.length == 0) return response;

        for(let i=0; i< mongoResponse.length; i++){
            let tmp = await OrderMapper._fromMongooseToModel(mongoResponse[i]);
            response.push(tmp)
        }
        return response;
    };

    static save = async (dm: Order) => {
        const mongoResponse = await OrderMongoose.create(
            await OrderMapper._fromdmToMongoose(dm)
        );
        return OrderMapper.find({ id: mongoResponse._id });
    };

    static update = async (dm: Order) => {
        let mm = await OrderMapper._fromdmToMongoose(dm);
        delete mm._id;

        const mongoResponse = await OrderMongoose.findByIdAndUpdate(dm.getId(), mm);

        if (mongoResponse) return OrderMapper.find({ id: mongoResponse._id });
        else throw new OtherError();
    };


    static getCountByDate = async () =>{
        const rs = await OrderMongoose.aggregate(
            [
                {
                    $group:
                        {
                            _id:
                                {
                                    day: { $dayOfMonth: "$createdOn" },
                                    month: { $month: "$createdOn" },
                                    year: { $year: "$createdOn" }
                                },
                            count: { $sum:1 },
                            date: { $first: "$createdOn" }
                        }
                },
                {
                    $project:
                        {
                            date:
                                {
                                    $dateToString: { format: "%Y-%m-%d", date: "$date" }
                                },
                            count: 1,
                            _id: 0
                        }
                }
            ]);
        return rs;
    }

    /*
    static hardDelete = async (id: string) => {
        if (!mongoose.Types.ObjectId.isValid(id))
            throw new ValidationError("Order.id is not a valid Id");

        const response = await OrderMongoose.deleteOne({ _id: id }).exec();

        if (
            response.ok == 1 && response.deletedCount
                ? response.deletedCount > 0
                ? true
                : false
                : false
        )
            return { message: "Order Deleted Successfully" };
        else throw new OtherError("No Record Found !");
    };
    */
}

export default OrderMapper;

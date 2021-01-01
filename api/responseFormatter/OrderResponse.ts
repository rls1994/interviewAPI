import Order from "../../core/model/Order";
import FormatDate from '../../core/lib/DateFormat';
import dotenv from 'dotenv'
import UserResponse, {IUser} from "./UserResponse";
import VendorResponse, {IVendor} from "./VendorResponse";
import User from "../../core/model/User";
import Vendor from "../../core/model/Vendor";
dotenv.config();


export interface IOrder {
    message: string;
    user: IUser;
    vendor: IVendor;
    deliveryAddress: string;
    image: string[] | null;
    id: string | null;
    orderId: string;
    createdOn: string;
    modifiedOn: string;
}

export default class OrderResponse{
    
    static format(dm: Order[]): IOrder[]{

        let rm = dm.map(it => {
            let createdDate = it.getCreatedOn();
            let modifiedDate = it.getModifiedOn();
            let user = UserResponse.format([it.getUser() as User]);
            let vendor = VendorResponse.format([it.getVendor() as Vendor]);
            let tmp: IOrder = {
                id: it.getId()!,
                orderId: it.getOrderId()!,
                message: it.getMessage(),
                user: user[0],
                vendor: vendor[0],
                deliveryAddress: it.getDeliveryAddress(),
                image: it.getImage(),
                createdOn: createdDate ? FormatDate.format("DD Mon, HH:MM TT",createdDate) : "",
                modifiedOn: modifiedDate ? FormatDate.format("DD Mon, HH:MM TT",modifiedDate) : ""
            }
            return tmp
        })
        return rm;
    }
}
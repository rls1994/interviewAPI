import VendorType from "../model/VendorType";
import User from "../model/User";
import Vendor from "../model/Vendor";

export interface OrderFilter{
    id?: string;
    orderId?: string;
    message?: string;
    user?: User | string;
    vendor?: Vendor | string;
    deliveryAddress?: string;
    image?: string[];

    modifiedOn?: Date;
    search?: string;
    offset?: number;
    limit?: number;
};
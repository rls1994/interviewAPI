import VendorType from "../model/VendorType";

export interface VendorFilter{
    id?: string;
    name?: string;
    phone?: string;
    state?: string;
    city?: string;
    area?: string;
    type?: (VendorType | string)[];
    address?: string;
    otherPhone?: string[];

    isActive?:boolean;
    modifiedOn?: Date;
    search?: string;
    offset?: number;
    limit?: number;
};
import Vendor from "../../core/model/Vendor";
import FormatDate from '../../core/lib/DateFormat';
import dotenv from 'dotenv'
import VendorType from "../../core/model/VendorType";
import VendorTypeResponse, {IVendorType} from "./VendorTypeResponse";
dotenv.config();


export interface IVendor {
    name: string;
    phone: string;
    state: string;
    city: string;
    area: string;
    type: IVendorType[];
    address: string | null;
    otherPhone: string[] | null
    id: string | null;
    isActive: boolean;
    createdOn: string;
    modifiedOn: string;
}


export default class VendorResponse{
    
    static format(dm: Vendor[]): IVendor[]{

        let rm = dm.map(it => {
            let createdDate = it.getCreatedOn();
            let modifiedDate = it.getModifiedOn();
            let typeResponse = VendorTypeResponse.format(it.getType() as VendorType[]);
            let tmp: IVendor = {
                id: it.getId()!,
                name: it.getName(),
                phone: it.getPhone(),
                state: it.getState(),
                city: it.getCity(),
                area: it.gteArea(),
                address: it.getAddress(),
                otherPhone: it.getOtherPhone(),
                type: typeResponse,
                isActive: it.getStatus(),
                createdOn: createdDate ? FormatDate.format("DD Mon, HH:MM TT",createdDate) : "",
                modifiedOn: modifiedDate ? FormatDate.format("DD Mon, HH:MM TT",modifiedDate) : ""
            }
            return tmp
        })
        return rm;
    }


    static formatAndGetArea(dm: Vendor[]): string[]{
        let vendorArea: string[] = [];
        dm.forEach(it=>{
            vendorArea.push(it.gteArea());
        });

        let uniqueAreas = Array.from(new Set(vendorArea));
        return uniqueAreas;
    }
}
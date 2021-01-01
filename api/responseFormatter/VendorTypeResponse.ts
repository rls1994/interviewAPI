import VendorType from "../../core/model/VendorType";
import FormatDate from '../../core/lib/DateFormat';
import dotenv from 'dotenv'
dotenv.config();


export interface IVendorType {
    id: string;
    title: string;
    image: string | null;
    isActive: boolean;
    createdOn: string;
    modifiedOn: string;
}

export default class VendorTypeResponse{
    
    static format(dm: VendorType[]): IVendorType[]{

        let rm = dm.map(it => {
            let createdDate = it.getCreatedOn();
            let modifiedDate = it.getModifiedOn();
            let image = it.getImage();

            let tmp: IVendorType = {
                id: it.getId()!,
                title: it.getTitle(),
                image: image? process.env.BASE_URL+image : null,
                isActive: it.getStatus(),
                createdOn: createdDate ? FormatDate.format("DD Mon, HH:MM TT",createdDate) : "",
                modifiedOn: modifiedDate ? FormatDate.format("DD Mon, HH:MM TT",modifiedDate) : ""
            }
            return tmp
        })
        return rm;
    }
}
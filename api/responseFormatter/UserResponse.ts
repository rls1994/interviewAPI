import User from "../../core/model/User";
import FormatDate from '../../core/lib/DateFormat';
import dotenv from 'dotenv'
dotenv.config();


export interface IUser {
    name: string;
    phone: string;
    state: string;
    city: string;
    area: string | null;
    address: string | null;
    image: string | null;
    id: string | null;
    isVerified: boolean;
    isActive: boolean;
    createdOn: string;
    modifiedOn: string;
}

export default class UserResponse{
    
    static format(dm: User[]): IUser[]{

        let rm = dm.map(it => {
            let createdDate = it.getCreatedOn();
            let modifiedDate = it.getModifiedOn();
            let tmp: IUser = {
                id: it.getId()!,
                name: it.getName(),
                phone: it.getPhone(),
                state: it.getState(),
                city: it.getCity(),
                area: it.getArea(),
                address: it.getAddress(),
                image: it.getImage() !=null ? `${process.env.BASE_URL}${it.getImage()}` : null,
                isActive: it.getStatus(),
                isVerified: it.getVerificationStatus(),
                createdOn: createdDate ? FormatDate.format("DD Mon, HH:MM TT",createdDate) : "",
                modifiedOn: modifiedDate ? FormatDate.format("DD Mon, HH:MM TT",modifiedDate) : ""
            }
            return tmp
        })
        return rm;
    }
}

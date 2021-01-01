import "../index"; // for connnecting with DB
import mongoose from "mongoose";
import {
    OtherError,
    ValidationError
} from "../../../Error/AppError";
import UserMongoose, { IUserMongoose } from "../models/user";
import { UserFilter } from '../../filterInterface/UserFilter';
import User from "../../model/User";

class UserMapper {
    /***************** From Mongoose Model To Domain Model Start *****************/
    static _fromMongooseToModel = async (mm: IUserMongoose) => {

        return new User(
            mm.name,
            mm.phone,
            mm.state,
            mm.city,
            {data:mm.password, type:"hash"},
            mm.image,
            mm.area,
            mm.address,
            mm.isVerified,
            mm._id,
            mm.isActive,
            mm.createdOn,
            mm.modifiedOn
        )
    };
    /***************** From Mongoose Model To Domain Model End *****************/

    /***************** From Domain Model To Mongoose Model Start *****************/
    private static _fromdmToMongoose = (dm: User) => {
        let _id = dm.getId();
        let createdOn = dm.getCreatedOn();
        const model: IUserMongoose = {
            name: dm.getName(),
            phone: dm.getPhone(),
            state: dm.getState(),
            city: dm.getCity(),
            area: dm.getArea(),
            address: dm.getAddress(),
            password: dm.getPassword(),
            image: dm.getImage(),
            isVerified: dm.getVerificationStatus(),
            isActive: dm.getStatus(),
            _id: _id? _id : new mongoose.Types.ObjectId(),
            createdOn: createdOn? createdOn: new Date(),
            modifiedOn: new Date()
        }
        return model;
    };
    /***************** From Domain Model To Mongoose Model End *****************/

    static count = async () => {
        return await UserMongoose.countDocuments({});
    };

    static find = async (filter: UserFilter) => {
        if (filter.id) {
            if (!mongoose.Types.ObjectId.isValid(filter.id))
                throw new ValidationError("User.id is not a valid Id");
        }
        let searchFilter: any = {};
        let offset: number = 0;
        let limit: number = 200;
        if (filter.offset) offset = filter.offset;
        if (filter.limit) limit = filter.limit;
        if (filter.search) {
            let regex = new RegExp(
                filter.search.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"),
                "gi"
            );
            searchFilter.$or = [
                {
                    name: regex
                },
                {
                    phone: regex
                },
                {
                    area: regex
                },
                {
                    city: regex
                },
                {
                    address: regex
                },
                {
                    state: regex
                }
            ];
        }
        if (filter.id) searchFilter._id = filter.id;
        if (filter.isVerified) searchFilter.isVerified = filter.isVerified;
        if (filter.name) searchFilter.name = filter.name;
        if (filter.area) searchFilter.area = filter.area;
        if (filter.phone) searchFilter.phone = filter.phone;
        if (filter.city) searchFilter.city = filter.city;
        if (filter.state) searchFilter.state = filter.state;
        if (filter.address) searchFilter.address = filter.address;
        if (filter.isActive) searchFilter.isActive = filter.isActive;

        const mongoResponse = await UserMongoose.find(searchFilter)
            .skip(offset)
            .limit(limit)
            .exec();

        let response: User[] = [];
        if (mongoResponse.length == 0) return response;

        for(let i=0; i< mongoResponse.length; i++){
            let tmp = await UserMapper._fromMongooseToModel(mongoResponse[i]);
            response.push(tmp)
        }
        return response;
    };

    static save = async (dm: User) => {
        const mongoResponse = await UserMongoose.create(
            UserMapper._fromdmToMongoose(dm)
        );
        return UserMapper.find({ id: mongoResponse._id });
    };

    static update = async (dm: User) => {
        let mm = UserMapper._fromdmToMongoose(dm);
        delete mm._id;
        if(mm.password == ".....") delete mm.password;

        const mongoResponse = await UserMongoose.findByIdAndUpdate(dm.getId(), mm);

        if (mongoResponse) return UserMapper.find({ id: mongoResponse._id });
        else throw new OtherError();
    };

    static hardDelete = async (id: string) => {
        if (!mongoose.Types.ObjectId.isValid(id))
            throw new ValidationError("User.id is not a valid Id");

        const response = await UserMongoose.deleteOne({ _id: id }).exec();

        if (
            response.ok == 1 && response.deletedCount
                ? response.deletedCount > 0
                ? true
                : false
                : false
        )
            return { message: "User Deleted Successfully" };
        else throw new OtherError("No Record Found !");
    };

    static getCountByDate = async () =>{
        const rs = await UserMongoose.aggregate(
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
}

export default UserMapper;

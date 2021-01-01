import "../index"; // for connnecting with DB
import mongoose from "mongoose";
import {
    OtherError,
    ValidationError
} from "../../../Error/AppError";
import VendorMongoose, { IVendorMongoose } from "../models/vendor";
import { VendorFilter } from '../../filterInterface/VendorFilter';
import VendorType from "../../model/VendorType";
import VendorTypeMapper from "./VendorTypeMapper";
import Vendor from "../../model/Vendor";

class VendorMapper {
    /***************** From Mongoose Model To Domain Model Start *****************/
    static _fromMongooseToModel = async (mm: IVendorMongoose) => {

        let vendorTypes : VendorType[] = [];
        for(let i=0; i< mm.type.length; i++){
            let singleType = mm.type[i];
            let tmp = await VendorTypeMapper.find({id:singleType});
            if(tmp.length>0)vendorTypes.push(tmp[0]);
        }
        return new Vendor(
            mm.name,
            mm.phone,
            mm.state,
            mm.city,
            mm.area,
            vendorTypes,
            mm.address,
            mm.otherPhone,
            mm._id,
            mm.isActive,
            mm.createdOn,
            mm.modifiedOn
        )
    };
    /***************** From Mongoose Model To Domain Model End *****************/

    /***************** From Domain Model To Mongoose Model Start *****************/
    private static _fromdmToMongoose = (dm: Vendor) => {
        let _id = dm.getId();
        let createdOn = dm.getCreatedOn();
        const model: IVendorMongoose = {
            name: dm.getName(),
            phone: dm.getPhone(),
            state: dm.getState(),
            city: dm.getCity(),
            area: dm.gteArea(),
            address: dm.getAddress(),
            otherPhone: dm.getOtherPhone(),
            type: dm.getType(),
            isActive: dm.getStatus(),
            _id: _id? _id : new mongoose.Types.ObjectId(),
            createdOn: createdOn? createdOn: new Date(),
            modifiedOn: new Date()
        }
        return model;
    };
    /***************** From Domain Model To Mongoose Model End *****************/

    static count = async () => {
        return await VendorMongoose.countDocuments({});
    };

    static find = async (filter: VendorFilter) => {
        if (filter.id) {
            if (!mongoose.Types.ObjectId.isValid(filter.id))
                throw new ValidationError("Vendor.id is not a valid Id");
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
                }
            ];
        }


        if (filter.type){
            searchFilter.type = {
                $in: filter.type
            }
        }

        if (filter.id) searchFilter._id = filter.id;
        if (filter.name) searchFilter.name = filter.name;
        if (filter.area){
            //searchFilter.area = filter.area;
            searchFilter.$or = [
                {
                    area: filter.area
                },
                {
                    area: "WHOLE BHIWANI"
                },
            ]
        }
        if (filter.city) searchFilter.city = filter.city;
        if (filter.state) searchFilter.state = filter.state;
        if (filter.address) searchFilter.address = filter.address;
        if (filter.isActive == true || filter.isActive == false) searchFilter.isActive = filter.isActive;
        else searchFilter.isActive = true

        const mongoResponse = await VendorMongoose.find(searchFilter)
            .skip(offset)
            .limit(limit)
            .sort({area:1})
            .exec();

        let response: Vendor[] = [];
        if (mongoResponse.length == 0) return response;

        for(let i=0; i< mongoResponse.length; i++){
            let tmp = await VendorMapper._fromMongooseToModel(mongoResponse[i]);
            response.push(tmp)
        }
        return response;
    };

    static save = async (dm: Vendor) => {
        const mongoResponse = await VendorMongoose.create(
            VendorMapper._fromdmToMongoose(dm)
        );
        return VendorMapper.find({ id: mongoResponse._id });
    };

    static update = async (dm: Vendor) => {
        let mm = VendorMapper._fromdmToMongoose(dm);
        delete mm._id;

        const mongoResponse = await VendorMongoose.findByIdAndUpdate(dm.getId(), mm);

        if (mongoResponse) return VendorMapper.find({ id: mongoResponse._id });
        else throw new OtherError();
    };

    static hardDelete = async (id: string) => {
        if (!mongoose.Types.ObjectId.isValid(id))
            throw new ValidationError("Vendor.id is not a valid Id");

        const response = await VendorMongoose.deleteOne({ _id: id }).exec();

        if (
            response.ok == 1 && response.deletedCount
                ? response.deletedCount > 0
                ? true
                : false
                : false
        )
            return { message: "Vendor Deleted Successfully" };
        else throw new OtherError("No Record Found !");
    };
}

export default VendorMapper;

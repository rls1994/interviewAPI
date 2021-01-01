import "../index"; // for connnecting with DB
import mongoose from "mongoose";
import {
  OtherError,
  ValidationError,
  NotFoundError
} from "../../../Error/AppError";
import VendorTypeMongoose, { IVendorTypeMongoose } from "../models/vendor_type";
import VendorType from '../../model/VendorType';
import { VendorTypeFilter } from '../../filterInterface/VendorTypeFilter';

class VendorTypeMapper {
  /***************** From Mongoose Model To Domain Model Start *****************/
  private static _fromMongooseToModel = (mm: IVendorTypeMongoose) => {
    return new VendorType(
      mm.title,
      mm.image,
      mm._id,
      mm.isActive,
      mm.createdOn,
      mm.modifiedOn
    )
  };
  /***************** From Mongoose Model To Domain Model End *****************/

  /***************** From Domain Model To Mongoose Model Start *****************/
  private static _fromModelToMongoose = (dm: VendorType) => {
    let _id = dm.getId();
    let createdOn = dm.getCreatedOn();
    let modifiedOn = dm.getModifiedOn();
    let image = dm.getImage();
    const model: IVendorTypeMongoose = {
      _id: _id ? _id : new mongoose.Types.ObjectId(),
      title: dm.getTitle(),
      image: image? image : null,
      isActive: dm.getStatus(),
      createdOn: createdOn!=null ? createdOn : new Date(),
      modifiedOn: modifiedOn!=null ? modifiedOn : new Date()
    };
    return model;
  };
  /***************** From Domain Model To Mongoose Model End *****************/

  static count = async () => {
    return await VendorTypeMongoose.countDocuments({});
  };

  static find = async (filter: VendorTypeFilter) => {
    if (filter.id) {
      if (!mongoose.Types.ObjectId.isValid(filter.id))
        throw new ValidationError("VendorType.id is not a valid Id");
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
          title: regex
        }
      ];
    }
    if (filter.id) searchFilter._id = filter.id;
    if (filter.title) searchFilter.title = filter.title;
    if (filter.isActive) searchFilter.isActive = filter.isActive;

    const mongoResponse = await VendorTypeMongoose.find(searchFilter)
      .skip(offset)
      .limit(limit)
      .exec();

    let response: VendorType[] = [];
    if (mongoResponse.length == 0) return response;

    response = mongoResponse.map(it =>
      VendorTypeMapper._fromMongooseToModel(it)
    );
    return response;
  };

  static save = async (dm: VendorType) => {
    const mongoResponse = await VendorTypeMongoose.create(
      VendorTypeMapper._fromModelToMongoose(dm)
    );
    return VendorTypeMapper.find({ id: mongoResponse._id });
  };

  static update = async (dm: VendorType) => {
    let mm = VendorTypeMapper._fromModelToMongoose(dm);
    delete mm._id;

    const mongoResponse = await VendorTypeMongoose.findByIdAndUpdate(dm.getId(), mm);

    if (mongoResponse) return VendorTypeMapper.find({ id: mongoResponse._id });
    else throw new OtherError();
  };


  static hardDelete = async (id: string) => {
    if (!mongoose.Types.ObjectId.isValid(id))
      throw new ValidationError("VendorType.id is not a valid Id");

    const mongoResponse = await VendorTypeMongoose.deleteOne({_id: id});

    if(mongoResponse.ok == 1 && (mongoResponse.deletedCount)?(mongoResponse.deletedCount>0)?true:false:false)
      return {message: "VendorType Deleted Successfully"};
    else throw new OtherError("No VendorType Found fot this Id!");
  };

}

export default VendorTypeMapper;

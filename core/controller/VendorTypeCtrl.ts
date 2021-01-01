import VendorTypeMapper from "../db/datamapper/VendorTypeMapper";
import { AuthenticationError, ValidationError } from '../../Error/AppError';
import VendorType from '../model/VendorType';
import { VendorTypeFilter } from '../filterInterface/VendorTypeFilter';

class VendorTypeCtrl {
  static add = async (data: VendorTypeFilter) => {
    if(!data.title) throw new ValidationError("VendorType.Title is Required");
    let dm = new VendorType(
      data.title,
      data.image ? data.image : null
    )
    const response = await VendorTypeMapper.save(dm);
    return response;
  };

  static get = async (filter: VendorTypeFilter) => {
    const response = await VendorTypeMapper.find(filter);

    return response;
  };

  static count = async () => {
    return await VendorTypeMapper.count();
  };

  static update = async (Data: VendorTypeFilter) => {
    if (!Data.id) throw new ValidationError("VendorType Id is Required");
    let olddm = (await VendorTypeCtrl.get({ id: Data.id }))[0];

    let dm = new VendorType(
      Data.title ? Data.title : olddm.getTitle(),
      Data.image ? Data.image : olddm.getImage(),
      Data.id,
        (Data.isActive == true || Data.isActive == false)? Data.isActive : olddm.getStatus(),
      olddm.getCreatedOn()!
    );
    const response = await VendorTypeMapper.update(dm);

    return response;
  };


  static delete = async (Id: string) => {
    const response = await VendorTypeMapper.hardDelete(Id);
    return response;
  };

}

export default VendorTypeCtrl;

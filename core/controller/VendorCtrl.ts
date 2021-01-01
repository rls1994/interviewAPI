import VendorMapper from "../db/datamapper/VendorMapper";
import { AuthenticationError, ValidationError } from '../../Error/AppError';
import Vendor from '../model/Vendor';
import { VendorFilter } from '../filterInterface/VendorFilter';
import VendorType from "../model/VendorType";
import csvToJson from "../lib/csvToJson";
import VendorTypeCtrl from "./VendorTypeCtrl";

class VendorCtrl {
  static add = async (data: VendorFilter) => {
    if(!data.name) throw new ValidationError("Vendor.Name is Required");
    if(!data.state) throw new ValidationError("Vendor.State is Required");
    if(!data.city) throw new ValidationError("Vendor.City is Required");
    if(!data.area) throw new ValidationError("Vendor.Area is Required");
    if(!data.phone) throw new ValidationError("Vendor.Phone is Required");
    let dm = new Vendor(
        data.name,
        (data.phone).replace(/[!@#$%^&*,?"'.():;{}|<>_+=\-\[\]\\/\s]+/g, ""),
        data.state,
        data.city,
        data.area,
        data.type!,
        data.address?data.address:null,
        data.otherPhone?data.otherPhone:null
    )
    const response = await VendorMapper.save(dm);
    return response;
  };

  static get = async (filter: VendorFilter) => {
    const response = await VendorMapper.find(filter);

    return response;
  };

  static count = async () => {
    return await VendorMapper.count();
  };

  static update = async (Data: VendorFilter) => {
    if (!Data.id) throw new ValidationError("Vendor Id is Required");
    let olddm = (await VendorCtrl.get({ id: Data.id }))[0];
    let oldTypes: string[] = [];
    let vendoroldType = olddm.getType() as VendorType[];
    vendoroldType.forEach((it) =>{
      let tmp = it.getId()!;
      oldTypes.push(tmp);
    })
    let dm = new Vendor(
        Data.name?Data.name: olddm.getName(),
        Data.phone?(Data.phone).replace(/[!@#$%^&*,?"'.():;{}|<>_+=\-\[\]\\/\s]+/g, ""): olddm.getPhone(),
        Data.state?Data.state:olddm.getState(),
        Data.city?Data.city:olddm.getCity(),
        Data.area?Data.area:olddm.gteArea(),
        Data.type? Data.type: oldTypes,
        Data.address?Data.address:olddm.getAddress(),
        Data.otherPhone?Data.otherPhone:olddm.getOtherPhone(),
        Data.id,
        (Data.isActive == true || Data.isActive == false)?Data.isActive: olddm.getStatus(),
        olddm.getCreatedOn()!
    )
    const response = await VendorMapper.update(dm);

    return response;
  };

  static delete = async (Id: string) => {
    const response = await VendorMapper.hardDelete(Id);
    return response;
  };

  static bulkUpload = async (filelocation: string) => {
    let jsonData = await csvToJson.convert(filelocation);
    let dataToSave: VendorFilter[] = [];
    let errorData: string[] = [];
    /**************** getting all Vendor Types *****************/
    let allVendorTypesData = await VendorTypeCtrl.get({});
    let vendorTypes: {id:string, title: string}[] = [];
    allVendorTypesData.map(it=>{
      vendorTypes.push({id:it.getId()!, title: it.getTitle()});
    });


    for (let i = 0; i < jsonData.length; i++) {
      let vendorData: VendorFilter = {};
      let rowNumber = i + 2;
      let rowData = jsonData[i];

      if (rowData.Name == undefined || rowData.Name == "") errorData.push("Name cannot be Empty. Error" +
          " at Row No.: "+rowNumber);
      else vendorData.name = rowData.Name;

      if(rowData.Type){
        let rawType: string = rowData.Type;
        rawType = rawType.replace(/\s/g, "");
        let tmpVendorType: string[] = rawType.split(",");

        let typeId: string[] = [];
        for(let i=0; i< vendorTypes.length; i++){
          for(let j=0; j< tmpVendorType.length; j++){
            let fromExcel = (tmpVendorType[j]).replace(/\s/g, "").toLowerCase();
            let fromDb = (vendorTypes[i].title).replace(/\s/g, "").toLowerCase();
            if(fromDb == fromExcel){
              typeId.push(vendorTypes[i].id);
            }
          }
        }

        if(typeId.length ==0 ) errorData.push("Invalid Type Name. Please add The Type First. Error at Row No.: "+rowNumber);
        else vendorData.type = typeId;
      }

      if(rowData.OtherPhone) {
        let rawPhone = rowData.OtherPhone;
        rawPhone = rawPhone.replace(/\s/g, "");
        let otherPhoneNos = rawPhone.split(",")
        vendorData.otherPhone = otherPhoneNos;
      }

      if (rowData.Phone == undefined || rowData.Phone == "") errorData.push("Phone cannot be Empty. Error" +
          " at Row No.: "+rowNumber);
      else {
        vendorData.phone = (rowData.Phone).replace(/[!@#$%^&*,?"'.():;{}|<>_+=\-\[\]\\/\s]+/g, "");
      }

      if (rowData.State == undefined || rowData.State == "") errorData.push("State cannot be Empty. Error" +
          " at Row No.: "+rowNumber);
      else vendorData.state = rowData.State;

      if (rowData.City == undefined || rowData.City == "") errorData.push("City cannot be Empty. Error" +
          " at Row No.: "+rowNumber);
      else vendorData.city = rowData.City;

      if (rowData.Area == undefined || rowData.Area == "") errorData.push("Area cannot be Empty. Error" +
          " at Row No.: "+rowNumber);
      else vendorData.area = rowData.Area;

      if(rowData.Address) vendorData.address = rowData.Address;


      dataToSave.push(vendorData)
    }

    if(errorData.length>0) throw new ValidationError("Please Resolve the Errors First",errorData);

    let savedVendors: Vendor[] =[];
    for(let i=0; i< dataToSave.length; i++){
      let res = await VendorCtrl.add(dataToSave[i]);
      savedVendors.push(res[0]);
    }
    return savedVendors;
  }

}

export default VendorCtrl;

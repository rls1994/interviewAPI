import { ValidationError } from "../../Error/AppError";
import VendorType from "./VendorType";

export default class Vendor {
  private name!: string;
  private phone!: string;
  private state!: string;
  private city!: string;
  private area!: string;
  private type!: (VendorType | string)[];
  private  address: string | null = null;
  private otherPhone: string[] = []
  private _id: string | null = null;
  private isActive: boolean = true;
  private createdOn: Date | null = null;
  private modifiedOn: Date | null = null;
  constructor(
    name: string,
    phone: string,
    state: string,
    city: string,
    area: string,
    type: (VendorType | string)[],
    address: string | null,
    otherPhone: string[] | null,
    _id?: string,
    isActive?: boolean,
    createdOn?: Date,
    modifiedOn?: Date
  ) {

    this.setName(name);
    this.setPhone(phone);
    this.setState(state);
    this.setCity(city);
    this.setArea(area);
    this.setType(type);
    if(address)  this.setAddress(address);
    if(otherPhone) this.setOtherPhone(otherPhone);
    if (_id) this.setId(_id);
    if(isActive == true || isActive == false) this.isActive = isActive;
    if (createdOn) this.setCreatedOn(createdOn)
    if (modifiedOn) this.setModifiedOn(modifiedOn)
  }

  getName = () => this.name;
  getPhone = () => this.phone;
  getState = () => this.state;
  getCity = () => this.city;
  gteArea = () => this.area;
  getAddress = () => this.address;
  getOtherPhone = () => this.otherPhone;
  getType = () => this.type
  getId = () => this._id;
  getStatus = () => this.isActive;
  getCreatedOn = () => this.createdOn;
  getModifiedOn = () => this.modifiedOn;

  private setId = (id: string | null) => {
    this._id = id;
  };
  private setName = (name: string) => {
    if (!name) throw new ValidationError("Vendor.name is Required");
    if (typeof name != "string") throw new ValidationError("Vendor.name is Invalid");

    if (name.length > 200)
      throw new ValidationError(
          "Vendor.name length should not be more than 200"
      );
    this.name = name;
  };

  private setPhone = (phone: string) => {
    if (!phone) throw new ValidationError("Vendor.phone is Required");
    if (typeof phone != "string") throw new ValidationError("Vendor.phone is Invalid");

    if (phone.length > 12)
      throw new ValidationError(
          "Vendor.phone length should not be more than 12"
      );
    this.phone = phone;
  };

  private setState = (state: string) => {
    if (!state) throw new ValidationError("Vendor.state is Required");
    if (typeof state != "string") throw new ValidationError("Vendor.state is Invalid");

    if (state.length > 100)
      throw new ValidationError(
          "Vendor.state length should not be more than 100"
      );
    this.state = state;
  };

  private setCity = (city: string) => {
    if (!city) throw new ValidationError("Vendor.city is Required");
    if (typeof city != "string") throw new ValidationError("Vendor.city is Invalid");

    if (city.length > 100)
      throw new ValidationError(
          "Vendor.city length should not be more than 100"
      );
    this.city = city;
  };

  private setArea = (area: string) => {
    if (!area) throw new ValidationError("Vendor.area is Required");
    if (typeof area != "string") throw new ValidationError("Vendor.area is Invalid");

    if (area.length > 200)
      throw new ValidationError(
          "Vendor.area length should not be more than 200"
      );
    this.area = area;
  };

  private setAddress = (address: string) => {
    if (!address) throw new ValidationError("Vendor.address is Required");
    if (typeof address != "string") throw new ValidationError("Vendor.address is Invalid");

    if (address.length > 200)
      throw new ValidationError(
          "Vendor.address length should not be more than 200"
      );
    this.address = address;
  };

  private setOtherPhone = (otherPhone: string[]) => {
    if (!otherPhone) throw new ValidationError("Vendor.otherPhone is Required");
    this.otherPhone = otherPhone;
  };

  private setType = (type: (VendorType | string)[]) => {
    if (!type) throw new ValidationError("Vendor.type is Required");
    if(type.length == 0) throw new ValidationError("Vendor.type is Required");
    this.type = type;
  };

  private setCreatedOn = (createdOn: Date)=>{
    this.createdOn = createdOn;
  };
  private setModifiedOn= (modifiedOn: Date)=>{
    this.modifiedOn = modifiedOn;
  };

}

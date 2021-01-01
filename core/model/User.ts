import { ValidationError } from "../../Error/AppError";
import HashAndComparePassword from "../lib/HashAndComparePassword";

export default class User {
  private name!: string;
  private phone!: string;
  private state!: string;
  private city!: string;
  private area: string | null = null;
  private address: string | null = null;
  private image: string | null = null;
  private password!: string;
  private isVerified: boolean = false;
  private _id: string | null = null;
  private isActive: boolean = true;
  private createdOn: Date | null = null;
  private modifiedOn: Date | null = null;

  constructor(
    name: string,
    phone: string,
    state: string,
    city: string,
    password: {data: string, type?: string},
    image: string | null,
    area: string | null,
    address: string | null,
    isVerified?: boolean,
    _id?: string,
    isActive?: boolean,
    createdOn?: Date,
    modifiedOn?: Date
  ) {

    this.setName(name);
    this.setPhone(phone);
    this.setState(state);
    this.setCity(city);
    this.setPassword(password);
    this.setImage(image);
    if(address) this.setAddress(address);
    if(area) this.setArea(area);
    if (_id) this.setId(_id);
    if(isVerified == true || isVerified == false) this.isVerified = isVerified;
    if(isActive == true || isActive == false) this.isActive = isActive;
    if (createdOn) this.setCreatedOn(createdOn)
    if (modifiedOn) this.setModifiedOn(modifiedOn)
  }

  getName = () => this.name;
  getPhone = () => this.phone;
  getState = () => this.state;
  getCity = () => this.city;
  getArea = () => this.area;
  getAddress = () => this.address;
  getId = () => this._id;
  getStatus = () => this.isActive;
  getPassword = () => this.password;
  getImage = () => this.image;
  getVerificationStatus = () => this.isVerified;
  getCreatedOn = () => this.createdOn;
  getModifiedOn = () => this.modifiedOn;

  private setId = (id: string | null) => {
    this._id = id;
  };

  private setImage = (image:  string | null) =>{
    // if(!image) throw new ValidationError("User.image is Required");
    // if(typeof image != "string") throw new ValidationError("User.image is not Valid");
    this.image = image;
  }

  private setName = (name: string) => {
    if (!name) throw new ValidationError("User.name is Required");
    if (typeof name != "string") throw new ValidationError("User.name is Invalid");

    if (name.length > 200)
      throw new ValidationError(
          "User.name length should not be more than 200"
      );
    this.name = name;
  };

  private setPhone = (phone: string) => {
    if (!phone) throw new ValidationError("User.phone is Required");
    if (typeof phone != "string") throw new ValidationError("User.phone is Invalid");

    if (phone.length > 12)
      throw new ValidationError(
          "User.phone length should not be more than 12"
      );
    this.phone = phone;
  };

  private setState = (state: string) => {
    if (!state) throw new ValidationError("User.state is Required");
    if (typeof state != "string") throw new ValidationError("User.state is Invalid");

    if (state.length > 100)
      throw new ValidationError(
          "User.state length should not be more than 100"
      );
    this.state = state;
  };

  private setCity = (city: string) => {
    if (!city) throw new ValidationError("User.city is Required");
    if (typeof city != "string") throw new ValidationError("User.city is Invalid");

    if (city.length > 100)
      throw new ValidationError(
          "User.city length should not be more than 100"
      );
    this.city = city;
  };

  private setArea = (area: string) => {
    if (!area) throw new ValidationError("User.area is Required");
    if (typeof area != "string") throw new ValidationError("User.area is Invalid");

    if (area.length > 300)
      throw new ValidationError(
          "User.area length should not be more than 300"
      );
    this.area = area;
  };

  private setAddress = (address: string) => {
    if (!address) throw new ValidationError("User.address is Required");
    if (address.length > 600)
      throw new ValidationError("User.address length is not more than 600");
    this.address = address;
  };

  // use to hash a plain password
  private setPassword = (pwd: {data: string, type?: string}) => {
    let password = pwd.data;
    if (!password) throw new ValidationError("User.password is Required");
    if (password.length == 0)
      throw new ValidationError("User.password length is 0");
    if (password.length > 600)
      throw new ValidationError("User.password length is not more than 600");
    if (password.length < 4)
      throw new ValidationError(
          "User.password must be at least 4 character long"
      );
    if(pwd.type){
      if(pwd.type =="hash") this.password = password
    }
    else{
      if(password == ".....") this.password = ".....";
      else this.password = HashAndComparePassword.hashPassword(password);
    }
  };


  //use to compare password. takes two arguments 1. plain password, 2. hashed password, return true/false
  comparePassword = (plainPassword: string, passwordHash: string): boolean => {
    return HashAndComparePassword.comparePassword(plainPassword, passwordHash);
  };




  private setCreatedOn = (createdOn: Date)=>{
    this.createdOn = createdOn;
  };
  private setModifiedOn= (modifiedOn: Date)=>{
    this.modifiedOn = modifiedOn;
  };

}

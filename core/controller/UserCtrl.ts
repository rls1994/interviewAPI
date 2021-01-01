import UserMapper from "../db/datamapper/UserMapper";
import {AuthenticationError, NotFoundError, OtherError, ValidationError} from '../../Error/AppError';
import User from '../model/User';
import { UserFilter } from '../filterInterface/UserFilter';
import Redis from "../lib/Redis";
import HashAndComparePassword from "../lib/HashAndComparePassword";
import AuthenticationToken from "../lib/AuthenticationToken";
import SmsSender from "../lib/SmsSender";

class UserCtrl {

  private static phoneValidator = (phone: string) =>{
    if(!phone) throw new ValidationError("User Phone Number is Required");
    phone = phone.replace(/[!@#$%^&*,?"'.():;{}|<>_+=\-\[\]\\/\s]+/g, "");
    if(phone.length != 10) throw new ValidationError("Invalid Phone number Entered");
    return phone;
  }

  private static add = async (data: UserFilter) => {
    if(!data.name) throw new ValidationError("User.Name is Required");
    if(!data.state) data.state = "Haryana";
    if(!data.city) data.city = "Bhiwani";
    if(!data.password) throw new ValidationError("User.Password is Required");
   // if(!data.image) throw new ValidationError("User.Image is Required");
    if(!data.phone) throw new ValidationError("User.Phone is Required");
    else data.phone = UserCtrl.phoneValidator(data.phone);
    let dm = new User(
        data.name,
        (data.phone).replace(/[!@#$%^&*,?"'.():;{}|<>_+=\-\[\]\\/\s]+/g, ""),
        data.state,
        data.city,
        {data: data.password},
        data.image || null,
        data.area? data.area : null,
        data.address?data.address: null,
        true
    );
    const response = await UserMapper.save(dm);
    return response;
  };

  static get = async (filter: UserFilter) => {
    const response = await UserMapper.find(filter);

    return response;
  };

  static count = async () => {
    return await UserMapper.count();
  };

  static update = async (Data: UserFilter) => {
    if (!Data.id) throw new ValidationError("User Id is Required");
    let olddm = (await UserCtrl.get({ id: Data.id }))[0];
    let dm = new User(
        Data.name?Data.name: olddm.getName(),
        olddm.getPhone(),
        Data.state?Data.state:olddm.getState(),
        Data.city?Data.city:olddm.getCity(),
        Data.password?{data: Data.password}:{data:"....."},
        Data.image ? Data.image : olddm.getImage(),
        Data.area?Data.area:olddm.getArea(),
        Data.address? Data.address: olddm.getAddress(),
        (Data.isVerified == true || Data.isVerified == false)? Data.isVerified: olddm.getVerificationStatus(),
        Data.id,
        (Data.isActive == true || Data.isActive == false)? Data.isActive : olddm.getStatus(),
        olddm.getCreatedOn()!
    );

    const response = await UserMapper.update(dm);

    return response;
  };

  static delete = async (Id: string) => {
    const response = await UserMapper.hardDelete(Id);
    return response;
  };

  private static saveOtp = async(userPhone: string, otp: string) => {
    let rs = await Redis.setOtp(userPhone,otp);
    return rs;
  };

  private static checkOtp = async(userPhone: string, otp: string) => {
    let rs = await Redis.getOtp(userPhone);
    if(rs == otp) return true;
    else return false;
  }

  private static otpGenerator = () => {
    let digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 4; i++ ) {
      OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
  }

  static register = async(data: UserFilter) => {
    if(!data.phone) throw new ValidationError("User Phone is Required");
    let userPhone = UserCtrl.phoneValidator(data.phone);
    data.phone = userPhone;
    let userCheck = await UserCtrl.get({phone: userPhone});
    if(userCheck.length>0) throw new ValidationError("User Already Exists with the Given Number");

    let userResponse = await UserCtrl.add(data);
    if(userResponse.length ==0 ) throw new OtherError("Something went wrong while Registration");
    // let otp = UserCtrl.otpGenerator();
    // console.log("In User Ctrl Register Fun OTP: "+ otp);
    // let otpSaveRes = await UserCtrl.saveOtp(userPhone, otp);
    // if(otpSaveRes){
       return userResponse;
    // }
    // else{
    //   throw new OtherError("Something went wrong while Registration")
    // }
  }

  static generateOtp = async (userPhone: string) => {
    userPhone = UserCtrl.phoneValidator(userPhone);
    let user = await UserCtrl.get({phone: userPhone});

    if(user.length==0) throw new NotFoundError("No User Found");
    let otp = UserCtrl.otpGenerator();
    let otpMessage = `${otp} is Your OTP for App Account Verification.`;
    let smsSendReport = await SmsSender.send(userPhone,otpMessage);

    if(!smsSendReport)  throw new OtherError("Something went wrong while Sending OTP")

    let otpSaveRes = await UserCtrl.saveOtp(userPhone, otp);
    if(otpSaveRes){
      return user;
    }
    else{
      throw new OtherError("Something went wrong while OTP generation")
    }


  };

  static verifyUser = async(phone: string, otp: string) =>{
    phone = UserCtrl.phoneValidator(phone);
    let user = await UserCtrl.get({phone: phone});
    if(user.length==0) throw new NotFoundError("No User Exists");
    let check = await UserCtrl.checkOtp(phone,otp);
    if(!check) throw new ValidationError("Invalid OTP");

    let userRes = await UserCtrl.update({id:user[0].getId()!,isVerified:true});
    let token = AuthenticationToken.create({id: user[0].getId()!, phone: user[0].getPhone()});
    return {
      token: token,
      user: userRes[0]
    }
}

  static userLogin = async(phone: string, password: string) => {
    phone = UserCtrl.phoneValidator(phone);
    let user = await UserCtrl.get({phone:phone});
    if(user.length==0) throw new ValidationError("Invalid Credentials");

    let pwdRes = HashAndComparePassword.comparePassword(password, user[0].getPassword());
    if(!pwdRes) throw new ValidationError("Invalid Credentials");


    if(user[0].getVerificationStatus() == false)
      return {
        token: null,
        user: user[0]
      };

    let token = AuthenticationToken.create({id: user[0].getId()!, phone: user[0].getPhone()});

    return {
      token: token,
      user: user[0]
    }
  }

  static forgotPassword = async (phone: string) => {
    phone = UserCtrl.phoneValidator(phone);

    let user = await UserCtrl.get({phone:phone});
    if(user.length==0) throw new NotFoundError("No User Found");
    // let otp = UserCtrl.otpGenerator();
    // let otpSaveRes = await UserCtrl.saveOtp(phone, otp);
    // if(otpSaveRes){
      return user;
    // }
    // else{
    //   throw new OtherError("Something went wrong");
    // }
  }

  static changePassword = async (phone: string, oldPassword: string,newPassword: string) => {
    phone = UserCtrl.phoneValidator(phone);
    let user = await UserCtrl.get({phone:phone});

    if(user.length==0) throw new NotFoundError("No User Found");
    let pwdRes = HashAndComparePassword.comparePassword(oldPassword, user[0].getPassword());
    if(!pwdRes) throw new ValidationError("Invalid Password");

    let userResponse = await UserCtrl.update({id: user[0].getId()!, password: newPassword});
    return userResponse;
  }

  static getStats = async () => {
    let rs = UserMapper.getCountByDate();
    return rs;
  }

}

export default UserCtrl;

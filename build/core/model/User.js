"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var AppError_1 = require("../../Error/AppError");
var HashAndComparePassword_1 = __importDefault(require("../lib/HashAndComparePassword"));
var User = /** @class */ (function () {
    function User(name, phone, state, city, password, image, area, address, isVerified, _id, isActive, createdOn, modifiedOn) {
        var _this = this;
        this.area = null;
        this.address = null;
        this.image = null;
        this.isVerified = false;
        this._id = null;
        this.isActive = true;
        this.createdOn = null;
        this.modifiedOn = null;
        this.getName = function () { return _this.name; };
        this.getPhone = function () { return _this.phone; };
        this.getState = function () { return _this.state; };
        this.getCity = function () { return _this.city; };
        this.getArea = function () { return _this.area; };
        this.getAddress = function () { return _this.address; };
        this.getId = function () { return _this._id; };
        this.getStatus = function () { return _this.isActive; };
        this.getPassword = function () { return _this.password; };
        this.getImage = function () { return _this.image; };
        this.getVerificationStatus = function () { return _this.isVerified; };
        this.getCreatedOn = function () { return _this.createdOn; };
        this.getModifiedOn = function () { return _this.modifiedOn; };
        this.setId = function (id) {
            _this._id = id;
        };
        this.setImage = function (image) {
            // if(!image) throw new ValidationError("User.image is Required");
            // if(typeof image != "string") throw new ValidationError("User.image is not Valid");
            _this.image = image;
        };
        this.setName = function (name) {
            if (!name)
                throw new AppError_1.ValidationError("User.name is Required");
            if (typeof name != "string")
                throw new AppError_1.ValidationError("User.name is Invalid");
            if (name.length > 200)
                throw new AppError_1.ValidationError("User.name length should not be more than 200");
            _this.name = name;
        };
        this.setPhone = function (phone) {
            if (!phone)
                throw new AppError_1.ValidationError("User.phone is Required");
            if (typeof phone != "string")
                throw new AppError_1.ValidationError("User.phone is Invalid");
            if (phone.length > 12)
                throw new AppError_1.ValidationError("User.phone length should not be more than 12");
            _this.phone = phone;
        };
        this.setState = function (state) {
            if (!state)
                throw new AppError_1.ValidationError("User.state is Required");
            if (typeof state != "string")
                throw new AppError_1.ValidationError("User.state is Invalid");
            if (state.length > 100)
                throw new AppError_1.ValidationError("User.state length should not be more than 100");
            _this.state = state;
        };
        this.setCity = function (city) {
            if (!city)
                throw new AppError_1.ValidationError("User.city is Required");
            if (typeof city != "string")
                throw new AppError_1.ValidationError("User.city is Invalid");
            if (city.length > 100)
                throw new AppError_1.ValidationError("User.city length should not be more than 100");
            _this.city = city;
        };
        this.setArea = function (area) {
            if (!area)
                throw new AppError_1.ValidationError("User.area is Required");
            if (typeof area != "string")
                throw new AppError_1.ValidationError("User.area is Invalid");
            if (area.length > 300)
                throw new AppError_1.ValidationError("User.area length should not be more than 300");
            _this.area = area;
        };
        this.setAddress = function (address) {
            if (!address)
                throw new AppError_1.ValidationError("User.address is Required");
            if (address.length > 600)
                throw new AppError_1.ValidationError("User.address length is not more than 600");
            _this.address = address;
        };
        // use to hash a plain password
        this.setPassword = function (pwd) {
            var password = pwd.data;
            if (!password)
                throw new AppError_1.ValidationError("User.password is Required");
            if (password.length == 0)
                throw new AppError_1.ValidationError("User.password length is 0");
            if (password.length > 600)
                throw new AppError_1.ValidationError("User.password length is not more than 600");
            if (password.length < 4)
                throw new AppError_1.ValidationError("User.password must be at least 4 character long");
            if (pwd.type) {
                if (pwd.type == "hash")
                    _this.password = password;
            }
            else {
                if (password == ".....")
                    _this.password = ".....";
                else
                    _this.password = HashAndComparePassword_1.default.hashPassword(password);
            }
        };
        //use to compare password. takes two arguments 1. plain password, 2. hashed password, return true/false
        this.comparePassword = function (plainPassword, passwordHash) {
            return HashAndComparePassword_1.default.comparePassword(plainPassword, passwordHash);
        };
        this.setCreatedOn = function (createdOn) {
            _this.createdOn = createdOn;
        };
        this.setModifiedOn = function (modifiedOn) {
            _this.modifiedOn = modifiedOn;
        };
        this.setName(name);
        this.setPhone(phone);
        this.setState(state);
        this.setCity(city);
        this.setPassword(password);
        this.setImage(image);
        if (address)
            this.setAddress(address);
        if (area)
            this.setArea(area);
        if (_id)
            this.setId(_id);
        if (isVerified == true || isVerified == false)
            this.isVerified = isVerified;
        if (isActive == true || isActive == false)
            this.isActive = isActive;
        if (createdOn)
            this.setCreatedOn(createdOn);
        if (modifiedOn)
            this.setModifiedOn(modifiedOn);
    }
    return User;
}());
exports.default = User;

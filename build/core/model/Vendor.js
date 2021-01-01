"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AppError_1 = require("../../Error/AppError");
var Vendor = /** @class */ (function () {
    function Vendor(name, phone, state, city, area, type, address, otherPhone, _id, isActive, createdOn, modifiedOn) {
        var _this = this;
        this.address = null;
        this.otherPhone = [];
        this._id = null;
        this.isActive = true;
        this.createdOn = null;
        this.modifiedOn = null;
        this.getName = function () { return _this.name; };
        this.getPhone = function () { return _this.phone; };
        this.getState = function () { return _this.state; };
        this.getCity = function () { return _this.city; };
        this.gteArea = function () { return _this.area; };
        this.getAddress = function () { return _this.address; };
        this.getOtherPhone = function () { return _this.otherPhone; };
        this.getType = function () { return _this.type; };
        this.getId = function () { return _this._id; };
        this.getStatus = function () { return _this.isActive; };
        this.getCreatedOn = function () { return _this.createdOn; };
        this.getModifiedOn = function () { return _this.modifiedOn; };
        this.setId = function (id) {
            _this._id = id;
        };
        this.setName = function (name) {
            if (!name)
                throw new AppError_1.ValidationError("Vendor.name is Required");
            if (typeof name != "string")
                throw new AppError_1.ValidationError("Vendor.name is Invalid");
            if (name.length > 200)
                throw new AppError_1.ValidationError("Vendor.name length should not be more than 200");
            _this.name = name;
        };
        this.setPhone = function (phone) {
            if (!phone)
                throw new AppError_1.ValidationError("Vendor.phone is Required");
            if (typeof phone != "string")
                throw new AppError_1.ValidationError("Vendor.phone is Invalid");
            if (phone.length > 12)
                throw new AppError_1.ValidationError("Vendor.phone length should not be more than 12");
            _this.phone = phone;
        };
        this.setState = function (state) {
            if (!state)
                throw new AppError_1.ValidationError("Vendor.state is Required");
            if (typeof state != "string")
                throw new AppError_1.ValidationError("Vendor.state is Invalid");
            if (state.length > 100)
                throw new AppError_1.ValidationError("Vendor.state length should not be more than 100");
            _this.state = state;
        };
        this.setCity = function (city) {
            if (!city)
                throw new AppError_1.ValidationError("Vendor.city is Required");
            if (typeof city != "string")
                throw new AppError_1.ValidationError("Vendor.city is Invalid");
            if (city.length > 100)
                throw new AppError_1.ValidationError("Vendor.city length should not be more than 100");
            _this.city = city;
        };
        this.setArea = function (area) {
            if (!area)
                throw new AppError_1.ValidationError("Vendor.area is Required");
            if (typeof area != "string")
                throw new AppError_1.ValidationError("Vendor.area is Invalid");
            if (area.length > 200)
                throw new AppError_1.ValidationError("Vendor.area length should not be more than 200");
            _this.area = area;
        };
        this.setAddress = function (address) {
            if (!address)
                throw new AppError_1.ValidationError("Vendor.address is Required");
            if (typeof address != "string")
                throw new AppError_1.ValidationError("Vendor.address is Invalid");
            if (address.length > 200)
                throw new AppError_1.ValidationError("Vendor.address length should not be more than 200");
            _this.address = address;
        };
        this.setOtherPhone = function (otherPhone) {
            if (!otherPhone)
                throw new AppError_1.ValidationError("Vendor.otherPhone is Required");
            _this.otherPhone = otherPhone;
        };
        this.setType = function (type) {
            if (!type)
                throw new AppError_1.ValidationError("Vendor.type is Required");
            if (type.length == 0)
                throw new AppError_1.ValidationError("Vendor.type is Required");
            _this.type = type;
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
        this.setArea(area);
        this.setType(type);
        if (address)
            this.setAddress(address);
        if (otherPhone)
            this.setOtherPhone(otherPhone);
        if (_id)
            this.setId(_id);
        if (isActive == true || isActive == false)
            this.isActive = isActive;
        if (createdOn)
            this.setCreatedOn(createdOn);
        if (modifiedOn)
            this.setModifiedOn(modifiedOn);
    }
    return Vendor;
}());
exports.default = Vendor;

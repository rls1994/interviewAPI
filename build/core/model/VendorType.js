"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AppError_1 = require("../../Error/AppError");
var VendorType = /** @class */ (function () {
    function VendorType(title, image, _id, isActive, createdOn, modifiedOn) {
        var _this = this;
        this.image = null;
        this._id = null;
        this.isActive = true;
        this.createdOn = null;
        this.modifiedOn = null;
        this.getId = function () { return _this._id; };
        this.getTitle = function () { return _this.title; };
        this.getImage = function () { return _this.image; };
        this.getStatus = function () { return _this.isActive; };
        this.getCreatedOn = function () { return _this.createdOn; };
        this.getModifiedOn = function () { return _this.modifiedOn; };
        this.setId = function (id) {
            _this._id = id;
        };
        this.setTitle = function (title) {
            if (!title)
                throw new AppError_1.ValidationError("VendorType.title is Required");
            if (typeof title != "string")
                throw new AppError_1.ValidationError("VendorType.title is Invalid");
            if (title.length > 80)
                throw new AppError_1.ValidationError("VendorType.title length should not be more than 80");
            _this.title = title;
        };
        this.setImage = function (image) {
            if (!image)
                throw new AppError_1.ValidationError("VendorType.image is Required");
            if (typeof image != "string")
                throw new AppError_1.ValidationError("VendorType.image is Invalid");
            _this.image = image;
        };
        this.setCreatedOn = function (createdOn) {
            _this.createdOn = createdOn;
        };
        this.setModifiedOn = function (modifiedOn) {
            _this.modifiedOn = modifiedOn;
        };
        this.setTitle(title);
        if (image)
            this.setImage(image);
        if (_id)
            this.setId(_id);
        if (isActive == true || isActive == false)
            this.isActive = isActive;
        if (createdOn)
            this.setCreatedOn(createdOn);
        if (modifiedOn)
            this.setModifiedOn(modifiedOn);
    }
    return VendorType;
}());
exports.default = VendorType;

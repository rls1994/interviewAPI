"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AppError_1 = require("../../Error/AppError");
var Order = /** @class */ (function () {
    function Order(message, user, vendor, deliveryAddress, image, orderId, _id, createdOn, modifiedOn) {
        var _this = this;
        this.image = null;
        this._id = null;
        this.createdOn = null;
        this.modifiedOn = null;
        this.getMessage = function () { return _this.message; };
        this.getUser = function () { return _this.user; };
        this.getVendor = function () { return _this.vendor; };
        this.getDeliveryAddress = function () { return _this.deliveryAddress; };
        this.getId = function () { return _this._id; };
        this.getOrderId = function () { return _this.orderId; };
        this.getImage = function () { return _this.image; };
        this.getCreatedOn = function () { return _this.createdOn; };
        this.getModifiedOn = function () { return _this.modifiedOn; };
        this.setId = function (id) {
            _this._id = id;
        };
        this.setMessage = function (message) {
            if (!message)
                throw new AppError_1.ValidationError("Order.message is Required");
            if (typeof message != "string")
                throw new AppError_1.ValidationError("Order.message is Invalid");
            if (message.length > 1000)
                throw new AppError_1.ValidationError("Order.message length should not be more than 1000");
            _this.message = message;
        };
        this.setImage = function (image) {
            if (!image)
                throw new AppError_1.ValidationError("Order.image is Required");
            _this.image = image;
        };
        this.setAddress = function (deliveryAddress) {
            if (!deliveryAddress)
                throw new AppError_1.ValidationError("Order.deliveryAddress is Required");
            if (typeof deliveryAddress != "string")
                throw new AppError_1.ValidationError("Order.deliveryAddress is Invalid");
            if (deliveryAddress.length > 800)
                throw new AppError_1.ValidationError("Order.deliveryAddress length should not be more than 800");
            _this.deliveryAddress = deliveryAddress;
        };
        this.setUser = function (user) {
            if (!user)
                throw new AppError_1.ValidationError("Order.user is Required");
            _this.user = user;
        };
        this.setVendor = function (vendor) {
            if (!vendor)
                throw new AppError_1.ValidationError("Order.vendor is Required");
            _this.vendor = vendor;
        };
        this.setCreatedOn = function (createdOn) {
            _this.createdOn = createdOn;
        };
        this.setModifiedOn = function (modifiedOn) {
            _this.modifiedOn = modifiedOn;
        };
        this.setMessage(message);
        this.setUser(user);
        this.setVendor(vendor);
        this.setAddress(deliveryAddress);
        if (image)
            this.setImage(image);
        if (_id)
            this.setId(_id);
        if (orderId)
            this.orderId = orderId;
        if (createdOn)
            this.setCreatedOn(createdOn);
        if (modifiedOn)
            this.setModifiedOn(modifiedOn);
    }
    return Order;
}());
exports.default = Order;

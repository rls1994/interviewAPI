"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var DateFormat_1 = __importDefault(require("../../core/lib/DateFormat"));
var dotenv_1 = __importDefault(require("dotenv"));
var UserResponse_1 = __importDefault(require("./UserResponse"));
var VendorResponse_1 = __importDefault(require("./VendorResponse"));
dotenv_1.default.config();
var OrderResponse = /** @class */ (function () {
    function OrderResponse() {
    }
    OrderResponse.format = function (dm) {
        var rm = dm.map(function (it) {
            var createdDate = it.getCreatedOn();
            var modifiedDate = it.getModifiedOn();
            var user = UserResponse_1.default.format([it.getUser()]);
            var vendor = VendorResponse_1.default.format([it.getVendor()]);
            var tmp = {
                id: it.getId(),
                orderId: it.getOrderId(),
                message: it.getMessage(),
                user: user[0],
                vendor: vendor[0],
                deliveryAddress: it.getDeliveryAddress(),
                image: it.getImage(),
                createdOn: createdDate ? DateFormat_1.default.format("DD Mon, HH:MM TT", createdDate) : "",
                modifiedOn: modifiedDate ? DateFormat_1.default.format("DD Mon, HH:MM TT", modifiedDate) : ""
            };
            return tmp;
        });
        return rm;
    };
    return OrderResponse;
}());
exports.default = OrderResponse;

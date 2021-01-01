"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var DateFormat_1 = __importDefault(require("../../core/lib/DateFormat"));
var dotenv_1 = __importDefault(require("dotenv"));
var VendorTypeResponse_1 = __importDefault(require("./VendorTypeResponse"));
dotenv_1.default.config();
var VendorResponse = /** @class */ (function () {
    function VendorResponse() {
    }
    VendorResponse.format = function (dm) {
        var rm = dm.map(function (it) {
            var createdDate = it.getCreatedOn();
            var modifiedDate = it.getModifiedOn();
            var typeResponse = VendorTypeResponse_1.default.format(it.getType());
            var tmp = {
                id: it.getId(),
                name: it.getName(),
                phone: it.getPhone(),
                state: it.getState(),
                city: it.getCity(),
                area: it.gteArea(),
                address: it.getAddress(),
                otherPhone: it.getOtherPhone(),
                type: typeResponse,
                isActive: it.getStatus(),
                createdOn: createdDate ? DateFormat_1.default.format("DD Mon, HH:MM TT", createdDate) : "",
                modifiedOn: modifiedDate ? DateFormat_1.default.format("DD Mon, HH:MM TT", modifiedDate) : ""
            };
            return tmp;
        });
        return rm;
    };
    VendorResponse.formatAndGetArea = function (dm) {
        var vendorArea = [];
        dm.forEach(function (it) {
            vendorArea.push(it.gteArea());
        });
        var uniqueAreas = Array.from(new Set(vendorArea));
        return uniqueAreas;
    };
    return VendorResponse;
}());
exports.default = VendorResponse;

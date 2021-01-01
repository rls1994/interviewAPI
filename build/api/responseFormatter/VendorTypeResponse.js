"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var DateFormat_1 = __importDefault(require("../../core/lib/DateFormat"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var VendorTypeResponse = /** @class */ (function () {
    function VendorTypeResponse() {
    }
    VendorTypeResponse.format = function (dm) {
        var rm = dm.map(function (it) {
            var createdDate = it.getCreatedOn();
            var modifiedDate = it.getModifiedOn();
            var image = it.getImage();
            var tmp = {
                id: it.getId(),
                title: it.getTitle(),
                image: image ? process.env.BASE_URL + image : null,
                isActive: it.getStatus(),
                createdOn: createdDate ? DateFormat_1.default.format("DD Mon, HH:MM TT", createdDate) : "",
                modifiedOn: modifiedDate ? DateFormat_1.default.format("DD Mon, HH:MM TT", modifiedDate) : ""
            };
            return tmp;
        });
        return rm;
    };
    return VendorTypeResponse;
}());
exports.default = VendorTypeResponse;

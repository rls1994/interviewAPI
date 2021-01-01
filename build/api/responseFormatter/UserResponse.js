"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var DateFormat_1 = __importDefault(require("../../core/lib/DateFormat"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var UserResponse = /** @class */ (function () {
    function UserResponse() {
    }
    UserResponse.format = function (dm) {
        var rm = dm.map(function (it) {
            var createdDate = it.getCreatedOn();
            var modifiedDate = it.getModifiedOn();
            var tmp = {
                id: it.getId(),
                name: it.getName(),
                phone: it.getPhone(),
                state: it.getState(),
                city: it.getCity(),
                area: it.getArea(),
                address: it.getAddress(),
                image: it.getImage() != null ? "" + process.env.BASE_URL + it.getImage() : null,
                isActive: it.getStatus(),
                isVerified: it.getVerificationStatus(),
                createdOn: createdDate ? DateFormat_1.default.format("DD Mon, HH:MM TT", createdDate) : "",
                modifiedOn: modifiedDate ? DateFormat_1.default.format("DD Mon, HH:MM TT", modifiedDate) : ""
            };
            return tmp;
        });
        return rm;
    };
    return UserResponse;
}());
exports.default = UserResponse;

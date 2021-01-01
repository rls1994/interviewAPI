"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var StateDistrict = /** @class */ (function () {
    function StateDistrict(name, districts) {
        var _this = this;
        this.districts = null;
        this.getName = function () { return _this.name; };
        this.getDistricts = function () { return _this.districts; };
        this.name = name;
        this.districts = districts || null;
    }
    return StateDistrict;
}());
exports.default = StateDistrict;

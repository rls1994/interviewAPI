"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var AppError = /** @class */ (function (_super) {
    __extends(AppError, _super);
    function AppError(message, httpStatusCode, data) {
        if (data === void 0) { data = null; }
        var _this = _super.call(this, message) || this;
        _this.getMessage = function () { return _this.message; };
        _this.getHttpStatusCode = function () { return _this.httpStatusCode; };
        _this.httpStatusCode = httpStatusCode;
        _this.data = data;
        return _this;
    }
    return AppError;
}(Error));
exports.default = AppError;
/**
 *  401 Errors
 *  Auth Errors
 */
var AuthenticationError = /** @class */ (function (_super) {
    __extends(AuthenticationError, _super);
    function AuthenticationError(message) {
        if (message === void 0) { message = 'Authentication Error'; }
        return _super.call(this, message, 401) || this;
    }
    return AuthenticationError;
}(AppError));
exports.AuthenticationError = AuthenticationError;
/**
 *
 *  400 Errors
 *  Validation Error
 */
var ValidationError = /** @class */ (function (_super) {
    __extends(ValidationError, _super);
    function ValidationError(message, data) {
        if (message === void 0) { message = 'Validation Error'; }
        if (data === void 0) { data = null; }
        return _super.call(this, message, 400, data) || this;
    }
    return ValidationError;
}(AppError));
exports.ValidationError = ValidationError;
var MissingFieldError = /** @class */ (function (_super) {
    __extends(MissingFieldError, _super);
    function MissingFieldError(argument) {
        var _this = this;
        var message = "Required field " + argument + " is missing";
        _this = _super.call(this, message) || this;
        return _this;
    }
    return MissingFieldError;
}(ValidationError));
exports.MissingFieldError = MissingFieldError;
/**
 * 404 Not Found Error
 */
var NotFoundError = /** @class */ (function (_super) {
    __extends(NotFoundError, _super);
    function NotFoundError(message) {
        if (message === void 0) { message = "Not Found"; }
        return _super.call(this, message, 404) || this;
    }
    return NotFoundError;
}(AppError));
exports.NotFoundError = NotFoundError;
/**
 *
 *  500 Errors
 *  Server Errors
 */
var InternalServerError = /** @class */ (function (_super) {
    __extends(InternalServerError, _super);
    function InternalServerError(message) {
        if (message === void 0) { message = 'Internal Server Error'; }
        return _super.call(this, message, 500) || this;
    }
    return InternalServerError;
}(AppError));
exports.InternalServerError = InternalServerError;
/**
 *
 * 422 Errors
 * Unprocessable Entity
 */
var OtherError = /** @class */ (function (_super) {
    __extends(OtherError, _super);
    function OtherError(message) {
        if (message === void 0) { message = 'Something Went Wrong'; }
        return _super.call(this, message, 422) || this;
    }
    return OtherError;
}(AppError));
exports.OtherError = OtherError;

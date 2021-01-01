"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var vendorTypeHandler_1 = require("../handler/vendorTypeHandler");
var vendorHandler_1 = require("../handler/vendorHandler");
var router = express_1.default.Router();
/*************vendor routes***************/
router.post("/", vendorHandler_1.get);
router.post("/area", vendorHandler_1.getArea);
/*************vendor type routes***************/
router.post("/type/", vendorTypeHandler_1.getType);
exports.default = router;

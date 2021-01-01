"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var orderHandler_1 = require("../handler/orderHandler");
var chechAuth_1 = require("../middleware/chechAuth");
var router = express_1.default.Router();
router.put("/", chechAuth_1.checkAuth, orderHandler_1.add);
router.post("/", chechAuth_1.checkAuth, orderHandler_1.get);
exports.default = router;

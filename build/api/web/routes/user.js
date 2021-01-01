"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var userHandler_1 = require("../handler/userHandler");
var router = express_1.default.Router();
router.put("/", userHandler_1.register);
router.post("/login", userHandler_1.login);
router.post("/sms", userHandler_1.sendmsg);
exports.default = router;

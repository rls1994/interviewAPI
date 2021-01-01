"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var overallStatsHandler_1 = require("../handler/overallStatsHandler");
var router = express_1.default.Router();
router.get("/", overallStatsHandler_1.getstats);
exports.default = router;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var stateCityHandler_1 = require("../handler/stateCityHandler");
var router = express_1.default.Router();
router.get('/', stateCityHandler_1.getStates);
router.get('/all', stateCityHandler_1.getAll);
router.post('/', stateCityHandler_1.getDistricts);
exports.default = router;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var userHandler_1 = require("../handler/userHandler");
var chechAuth_1 = require("../middleware/chechAuth");
var multer_1 = __importDefault(require("multer"));
var storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/users');
    },
    filename: function (req, file, cb) {
        var tmp = file.originalname.split(".");
        var fileExtension = tmp[tmp.length - 1];
        var fileName = "";
        for (var i = 0; i < (tmp.length - 1); i++) {
            fileName = fileName + tmp[i];
        }
        cb(null, (((fileName).replace(/ /g, '_').toLowerCase()) + "__" + ((new Date()).getTime()) + "." + fileExtension));
    }
});
var upload = multer_1.default({ storage: storage });
var router = express_1.default.Router();
router.put("/", upload.single("image"), userHandler_1.register);
router.post("/login", userHandler_1.login);
router.post("/verify", userHandler_1.verify);
router.post("/forgotPassword", userHandler_1.forgotPassword);
router.post("/generateOtp", userHandler_1.generateOtp);
router.patch("/", chechAuth_1.checkAuth, upload.single("image"), userHandler_1.update);
router.patch("/changePassword", chechAuth_1.checkAuth, userHandler_1.changePassword);
router.post("/temp", userHandler_1.temp);
exports.default = router;

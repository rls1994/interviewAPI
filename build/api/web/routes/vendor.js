"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var vendorTypeHandler_1 = require("../handler/vendorTypeHandler");
var vendorHandler_1 = require("../handler/vendorHandler");
var multer_1 = __importDefault(require("multer"));
var path_1 = __importDefault(require("path"));
var chechAuth_1 = require("../middleware/chechAuth");
var storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path_1.default.join(__dirname, '..', '..', '..', 'uploads', 'tmp'));
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
/*************vendor routes***************/
router.put("/", chechAuth_1.checkAuth, vendorHandler_1.add);
router.post("/", vendorHandler_1.get);
router.post("/area", vendorHandler_1.getArea);
router.patch("/", chechAuth_1.checkAuth, vendorHandler_1.update);
//router.delete("/:id",  deleteVendor);
router.put("/bulkUpload", chechAuth_1.checkAuth, upload.single("vendorSheet"), vendorHandler_1.bulkUpload);
/*************vendor type routes***************/
router.put("/type/", chechAuth_1.checkAuth, upload.single("image"), vendorTypeHandler_1.addType);
router.post("/type/", vendorTypeHandler_1.getType);
router.patch("/type/", chechAuth_1.checkAuth, upload.single("image"), vendorTypeHandler_1.updateType);
//router.delete("/type/:id",  deleteType);
exports.default = router;

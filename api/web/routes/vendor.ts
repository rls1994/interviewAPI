import express from "express";
import { addType, getType, updateType, deleteType} from "../handler/vendorTypeHandler";
import {add, update, get, getArea, deleteVendor, bulkUpload} from "../handler/vendorHandler";
import multer from "multer";
import path from 'path'
import {checkAuth} from "../middleware/chechAuth";


let storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, path.join(__dirname, '..', '..','..', 'uploads', 'tmp'));
  },
  filename: function (req, file, cb) {
    let tmp = file.originalname.split(".");
    let fileExtension = tmp[tmp.length - 1];
    let fileName = "";
    for(let i=0 ; i<(tmp.length-1);i++){
      fileName = fileName+tmp[i];
    }
    cb(null,(((fileName).replace(/ /g,'_').toLowerCase())+"__"+((new Date()).getTime())+"."+fileExtension))
  }
});

let upload = multer({ storage: storage });

const router = express.Router();


/*************vendor routes***************/
router.put("/", checkAuth, add);

router.post("/", get);

router.post("/area",  getArea);

router.patch("/", checkAuth, update);

//router.delete("/:id",  deleteVendor);

router.put("/bulkUpload",checkAuth,  upload.single("vendorSheet"), bulkUpload);




/*************vendor type routes***************/
router.put("/type/", checkAuth, upload.single("image"),  addType);

router.post("/type/",  getType);

router.patch("/type/", checkAuth, upload.single("image"), updateType);

//router.delete("/type/:id",  deleteType);


export default router;

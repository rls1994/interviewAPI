import express from "express";
import { temp, login, register, updateUser, registerUserV2, update, changePassword, verify, forgotPassword, generateOtp } from "../handler/userHandler";
import { checkAuth } from "../middleware/chechAuth";


import multer from "multer"
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/users')
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
let upload = multer({ storage: storage })



const router = express.Router();

router.put("/",upload.single("image"), registerUserV2);

router.post("/login", login);

// router.post("/verify", verify);

// router.post("/forgotPassword", forgotPassword);

// router.post("/generateOtp", generateOtp);

router.patch("/", checkAuth,upload.single("image"), update);

// router.patch("/changePassword", checkAuth, changePassword);


// router.post("/temp", temp);




export default router;

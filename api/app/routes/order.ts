import express from "express";
import { get,add } from "../handler/orderHandler";
import { checkAuth } from "../middleware/chechAuth";


const router = express.Router();


router.put("/",checkAuth, add);

router.post("/",checkAuth, get);


export default router;

import express from "express";
import { getType} from "../handler/vendorTypeHandler";
import {get, getArea} from "../handler/vendorHandler";

const router = express.Router();

/*************vendor routes***************/

router.post("/",  get);

router.post("/area",  getArea);

/*************vendor type routes***************/
router.post("/type/",  getType);

export default router;

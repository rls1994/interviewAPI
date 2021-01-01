import express from "express";
import {getstats} from "../handler/overallStatsHandler"
const router = express.Router();

router.get("/", getstats);

export default router;
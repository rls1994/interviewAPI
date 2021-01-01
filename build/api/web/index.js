"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var Router = express_1.default.Router();
require("../../modulepatch/expresspatch");
var AppError_1 = __importDefault(require("../../Error/AppError"));
Router.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Pass to next layer of middleware
    next();
});
var vendor_1 = __importDefault(require("./routes/vendor"));
var stats_1 = __importDefault(require("./routes/stats"));
/*************** App Main Routes ******************/
Router.use("/vendor", vendor_1.default);
Router.use("/stats", stats_1.default);
Router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Expose-Headers", "Content-Range");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});
//Not found Route
Router.use(function (req, res, next) {
    if (!req.route)
        next(new AppError_1.default("Route Not Found", 404));
    next();
});
//Response formatter
Router.use(function (req, res, next) {
    var data;
    if (!req.data)
        data = null;
    else {
        data = {
            count: req.count || 0,
            items: req.data
        };
    }
    res.send({
        success: req.success || true,
        message: req.message || null,
        //count: req.count || 0,
        data: data
    });
});
//error handler
Router.use(function (error, req, res, next) {
    res.status(error.httpStatusCode || 500).send({
        success: false,
        message: error.message,
        data: null
    });
});
exports.default = Router;

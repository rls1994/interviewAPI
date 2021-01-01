"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var App = /** @class */ (function () {
    function App() {
        var _this = this;
        this.initializeApp = function (middlewares, routes) {
            _this._addMiddleware(middlewares);
            _this._initializeRoutes(routes);
        };
        this._addMiddleware = function (middlewares) {
            middlewares.forEach(function (it) { return _this.app.use(it); });
        };
        this._initializeRoutes = function (routes) {
            //this.app.use(express.static(__dirname + '/reactBuild'));
            routes.forEach(function (it) { return _this.app.use(it.path, it.requestHandler); });
        };
        this.listen = function (port) {
            _this.app.listen(port);
        };
        this.app = express_1.default();
        this.app.use(cors_1.default());
        this.app.options("*", cors_1.default());
    }
    return App;
}());
exports.default = App;

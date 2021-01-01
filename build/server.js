"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var App_1 = __importDefault(require("./App"));
var morgan_1 = __importDefault(require("morgan"));
var body_parser_1 = __importDefault(require("body-parser"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var app_1 = __importDefault(require("./api/app"));
var web_1 = __importDefault(require("./api/web"));
var express_1 = __importDefault(require("express"));
var FileStream_1 = __importDefault(require("./core/lib/FileStream"));
//function that will check all the passed .env variables are set
//if any is missing then it will terminate the server
(function (names) {
    var shouldExit = false;
    for (var i = 0; i < names.length; i++) {
        if (!process.env[names[i]]) {
            shouldExit = true;
            console.log("Missing " + names[i] + " in .env");
        }
    }
    if (shouldExit) {
        console.log('****************** Server Terminates ******************');
        process.exit(0);
    }
})([
    'DB_URL',
    'BASE_URL',
    'PORT',
    'SERVER_NAME',
]);
FileStream_1.default.crateUploadDir();
var app = new App_1.default();
app.initializeApp([
    //middlewares
    morgan_1.default('dev'),
    body_parser_1.default.json()
], [
    //routes
    { path: '/api/app', requestHandler: app_1.default },
    { path: '/api/web', requestHandler: web_1.default },
    { path: '/uploads', requestHandler: express_1.default.static(__dirname + '/uploads') },
]);
app.listen(parseInt(process.env.PORT || '3200'));
console.log(process.env.SERVER_NAME + " Server Started on Port " + process.env.PORT);

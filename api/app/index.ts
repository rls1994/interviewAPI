import express, { Request, Response, NextFunction } from 'express'
const Router = express.Router()

import '../../modulepatch/expresspatch'
import AppError from "../../Error/AppError"


Router.use((req: Request, res: Response, next: NextFunction) => {
   // Website you wish to allow to connect
   res.setHeader('Access-Control-Allow-Origin', '*');

   // Request methods you wish to allow
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

   // Request headers you wish to allow
   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

   // Pass to next layer of middleware
   next();
});


import vendor from "./routes/vendor";
import stateDistrict from "./routes/stateDistrict";
import user from "./routes/user";
import userV2 from "./routes/userV2";
import userV3 from "./routes/userV3";
import order from "./routes/order";


/*************** App Main Routes ******************/
// Router.use("/vendor", vendor);
// Router.use("/state", stateDistrict);
Router.use("/user",user);
Router.use("/user/v2",userV2);
Router.use("/user/v3",userV3);
// Router.use("/order", order);


Router.use((req: Request, res: Response, next: NextFunction) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Expose-Headers","Content-Range")
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    next();
  });

//Not found Route
Router.use((req: Request, res:Response, next:NextFunction)=>{
    if(!req.route) next(new AppError("Route Not Found",404))
    next();
})

//Response formatter
Router.use((req: Request, res: Response, next: NextFunction)=>{
  let data:any;
  if(!req.data) data = null;
  else{
    data = {
      count: req.count || 0,
      items: req.data
    }
  }
    res.send({
        success: req.success || true,
        message: req.message || null,
        //count: req.count || 0,
        data
    })
})

//error handler
Router.use((error:AppError, req: Request, res: Response, next: NextFunction)=>{

  res.status(error.httpStatusCode||500).send({
      success: false,
      message: error.message,
      data: null
  })
})

export default Router

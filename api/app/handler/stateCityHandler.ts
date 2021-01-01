import stateDistrictController from '../../../core/controller/stateDistrictController'
import express, { RequestHandler, NextFunction, Response, Request } from 'express'
import '../../../modulepatch/expresspatch'
import { ValidationError, NotFoundError } from '../../../Error/AppError'


//get all states
export const getStates = async (req: Request, res: Response, next:NextFunction) => {   
  try{
    let rs = await stateDistrictController.getData("")
    if(rs){
      req.count = rs.length;
      req.data = rs.map(it =>it.getName());
      next()
    }
    else throw new NotFoundError()
  }
  catch(e){
    next(e)
  }
}

//get districts of state by stateCode
export const getDistricts = async (req: Request, res: Response, next: NextFunction) => {
  try{
    if(!req.body.state) throw new ValidationError("State Name is Required")
    let rs = await stateDistrictController.getData(req.body.state);
    if(rs){
      req.count = rs[0].getDistricts()?.length;
      req.data = rs[0].getDistricts()
      next()
    }
    else throw new NotFoundError();
  }
  catch(e){
    next(e);
  }
}

//get all states
export const getAll= async (req: Request, res: Response, next:NextFunction) => {   
  try{
    let rs = await stateDistrictController.getData("")
    if(rs){
      let data: {state:string, district: string}[] = [];
      rs.forEach(record=>{
        let state = record.getName();
        let districts = record.getDistricts();
        if(districts){
          for(let i =0; i< districts.length; i++){
            data.push({state: state, district: districts[i]});
          }
        }
        
      })
      req.count = data.length;
      req.data = data
      next()
    }
    else throw new NotFoundError()
  }
  catch(e){
    next(e)
  }
}
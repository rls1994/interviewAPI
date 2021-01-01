//State district Mongoose model
import mongoose from "mongoose";

export  interface IStateDistrictMongoose {
    name: string,
    districts: [string]
}

export interface IStateDistrictMongooseDocument  extends IStateDistrictMongoose, mongoose.Document{}

const state_districtSchema = new mongoose.Schema({
  name:{ type: String},
  districts:[
    {
      type:String
    }
  ]
});

export default mongoose.model<IStateDistrictMongooseDocument>('StateDistrict', state_districtSchema)

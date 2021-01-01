import mongoose from "mongoose";

export interface IVendorTypeMongoose {
  _id: any
  title: string
  image: string | null
  isActive: boolean
  createdOn?: Date
  modifiedOn?: Date
}


export interface IVendorTypeMongooseDocument  extends IVendorTypeMongoose, mongoose.Document{}

const Schema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title:{ type: String, required: [true,"Title is Required"] },
  image:{ type: String, default:null },
  isActive: {type: Boolean, default: true},
  createdOn: {type: Date, default: Date.now},
  modifiedOn: {type: Date, default: Date.now}
});

export default mongoose.model<IVendorTypeMongooseDocument>('vendor_type', Schema)
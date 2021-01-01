import mongoose from "mongoose";

export interface IVendorMongoose {
  _id: any
  name: string
  phone: string
  state: string
  city: string
  area: string
  type: any[]
  address: string | null
  otherPhone: string[] | null

  isActive: boolean
  createdOn?: Date
  modifiedOn?: Date
}

export interface IVendorMongooseDocument  extends IVendorMongoose, mongoose.Document{}

const Schema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name:{ type: String, required: [true,"Name is Required"] },
  phone:{ type: String, required: [true,"Phone is Required"] },
  state:{ type: String, required: [true,"State is Required"] },
  city:{ type: String, required: [true,"City is Required"] },
  area:{ type: String, required: [true,"Area is Required"] },
  type:{ type: [mongoose.Schema.Types.ObjectId], ref: 'vendor_type', required: [true,"Type is Required"] },
  otherPhone: {type: [String], default: null},
  address: {type: String, default: null},

  isActive: {type: Boolean, default: true},
  createdOn: {type: Date, default: Date.now},
  modifiedOn: {type: Date, default: Date.now}
});

export default mongoose.model<IVendorMongooseDocument>('vendor', Schema)
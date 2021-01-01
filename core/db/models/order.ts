import mongoose from "mongoose";
import shortid from "shortid"

export interface IOrderMongoose {
  _id: any
  orderId: string
  message: string
  user: any
  vendor: any
  deliveryAddress: string
  image: string[] | null

  createdOn?: Date
  modifiedOn?: Date
}

export interface IOrderMongooseDocument  extends IOrderMongoose, mongoose.Document{}

const Schema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  orderId: {type: String, required: [true, "Order Id is Required"]},
  message:{ type: String, required: [true,"Message is Required"] },
  user:{ type: mongoose.Schema.Types.ObjectId, ref: 'user', required: [true,"User Id is Required"] },
  vendor:{ type: mongoose.Schema.Types.ObjectId, ref: 'vendor', required: [true,"Order Id is Required"] },
  deliveryAddress:{ type: String, required: [true,"delivery address is Required"] },
  image:{ type: [String], default: null },

  createdOn: {type: Date, default: Date.now},
  modifiedOn: {type: Date, default: Date.now}
});

export default mongoose.model<IOrderMongooseDocument>('order', Schema)
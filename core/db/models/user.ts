import mongoose from "mongoose";

export interface IUserMongoose {
  _id: any
  name: string
  phone: string
  state: string
  city: string
  area: string | null
  password: string
  image: string | null
  address: string | null
  isVerified: boolean
  isActive: boolean
  createdOn?: Date
  modifiedOn?: Date
}

export interface IUserMongooseDocument  extends IUserMongoose, mongoose.Document{}

const Schema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name:{ type: String, required: [true,"Name is Required"] },
  phone:{ type: String, required: [true,"Phone is Required"] },
  state:{ type: String, required: [true,"State is Required"] },
  city:{ type: String, required: [true,"City is Required"] },
  area:{ type: String, required: [true,"Area is Required"] },
  password:{ type: String, required: [true,"Password is Required"] },
  image:{ type: String, default: null },
  address: {type: String, default: null},

  isVerified: {type: Boolean, default: false},
  isActive: {type: Boolean, default: true},
  createdOn: {type: Date, default: Date.now},
  modifiedOn: {type: Date, default: Date.now}
});

export default mongoose.model<IUserMongooseDocument>('user', Schema)

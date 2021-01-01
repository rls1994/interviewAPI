import { ValidationError } from "../../Error/AppError";
import User from "./User";
import Vendor from "./Vendor";


export default class Order {
  private message!: string;
  private user!: User | string;
  private vendor!: Vendor | string;
  private deliveryAddress!: string;
  private image: string[] | null = null;
  private _id: string | null = null;
  private  orderId?: string;
  private createdOn: Date | null = null;
  private modifiedOn: Date | null = null;
  constructor(
    message: string,
    user: User | string,
    vendor: Vendor | string,
    deliveryAddress: string,
    image: string[] | null,
    orderId?: string,
    _id?: string,
    createdOn?: Date,
    modifiedOn?: Date
  ) {

    this.setMessage(message);
    this.setUser(user);
    this.setVendor(vendor);
    this.setAddress(deliveryAddress);

    if(image) this.setImage(image);
    if (_id) this.setId(_id);
    if(orderId) this.orderId= orderId;
    if (createdOn) this.setCreatedOn(createdOn)
    if (modifiedOn) this.setModifiedOn(modifiedOn)
  }

  getMessage = () => this.message;
  getUser = () => this.user;
  getVendor = () => this.vendor;
  getDeliveryAddress = () => this.deliveryAddress;
  getId = () => this._id;
  getOrderId = () => this.orderId;
  getImage = () => this.image;
  getCreatedOn = () => this.createdOn;
  getModifiedOn = () => this.modifiedOn;

  private setId = (id: string | null) => {
    this._id = id;
  };
  private setMessage = (message: string) => {
    if (!message) throw new ValidationError("Order.message is Required");
    if (typeof message != "string") throw new ValidationError("Order.message is Invalid");

    if (message.length > 1000)
      throw new ValidationError(
          "Order.message length should not be more than 1000"
      );
    this.message = message;
  };
  private setImage = (image: string[]) => {
    if (!image) throw new ValidationError("Order.image is Required");

    this.image = image;
  };

  private setAddress = (deliveryAddress: string) => {
    if (!deliveryAddress) throw new ValidationError("Order.deliveryAddress is Required");
    if (typeof deliveryAddress != "string") throw new ValidationError("Order.deliveryAddress is Invalid");

    if (deliveryAddress.length > 800)
      throw new ValidationError(
          "Order.deliveryAddress length should not be more than 800"
      );
    this.deliveryAddress = deliveryAddress;
  };

  private setUser = (user: User | string) => {
    if (!user) throw new ValidationError("Order.user is Required");
    this.user = user;
  };

  private setVendor = (vendor: Vendor | string) => {
    if (!vendor) throw new ValidationError("Order.vendor is Required");
    this.vendor = vendor;
  };

  private setCreatedOn = (createdOn: Date)=>{
    this.createdOn = createdOn;
  };
  private setModifiedOn= (modifiedOn: Date)=>{
    this.modifiedOn = modifiedOn;
  };

}

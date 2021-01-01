import OrderMapper from "../db/datamapper/OrderMapper";
import { AuthenticationError, ValidationError } from '../../Error/AppError';
import Order from '../model/Order';
import { OrderFilter } from '../filterInterface/OrderFilter';
import SmsSender from "../lib/SmsSender";
import Vendor from "../model/Vendor";
import User from "../model/User";

class OrderCtrl {
  static add = async (data: OrderFilter) => {
    if(!data.message) throw new ValidationError("Order.Message is Required");
    if(!data.user) throw new ValidationError("Order.User ID is Required");
    if(!data.vendor) throw new ValidationError("Order.Vendor ID is Required");
    let dm = new Order(
        data.message,
        data.user,
        data.vendor,
        data.deliveryAddress!,
        data.image?data.image: null
    );
    const response = await OrderMapper.save(dm);

    let vendor = response[0].getVendor() as Vendor;
    let user = response[0].getUser() as User;
    let msg = `NEW ORDER RECEIVED \n Name: ${user.getName()} \n Phone: ${user.getPhone()} \n Address: ${response[0].getDeliveryAddress()} \n Order Detail: ${response[0].getMessage()}`;
    await SmsSender.send(vendor.getPhone(), msg);
    let userMsg = `Hello ${user.getName()}. Your order has been placed successfully. It will be delivered to you soon. For any issue call supplier. ${vendor.getPhone()}`;


    await SmsSender.send(user.getPhone(),userMsg);
    return response;
  };

  static get = async (filter: OrderFilter) => {
    const response = await OrderMapper.find(filter);

    return response;
  };

  static count = async () => {
    return await OrderMapper.count();
  };

  static getStats = async () => {
    let rs = OrderMapper.getCountByDate();
    return rs;
  }

}

export default OrderCtrl;

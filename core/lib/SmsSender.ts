import dotenv from 'dotenv'
dotenv.config();
import axios from "axios"

export default class SmsSender{
    static async send(mobileno: string, message: string) {
        let url = `${process.env.SMSAPI}&mobiles=${mobileno}&message=${message}&sender=COVBWN&route=6`;
        let rs = await axios.get((url.toString()));
        if(rs) return true;
        else return false;
    }
}
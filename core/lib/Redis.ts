import redis from 'redis';
import dotenv from 'dotenv';
import { promisify } from "util";
dotenv.config();


export default  class Redis {

    private static client = redis.createClient(6379,"localhost");
    private static getAsync = promisify(Redis.client.get).bind(Redis.client);

    static setOtp(key: string, value: string){
        let rs =  Redis.client.set(key, value);
        let expiryTime = (1000*60) * 5;
        Redis.client.expire(key,expiryTime);
        return rs;
    }

    static getOtp = async (key:string) =>{
       let data =  await Redis.getAsync(key);
       return  data;
    }

    static save(key: string, value: string){
        let response = Redis.client.set(key, value);
        return response;
    }

    static async get(key: string) {
        let data = await Redis.getAsync(key);
        return data;
    }
}
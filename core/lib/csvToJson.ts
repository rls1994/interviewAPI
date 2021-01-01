import csvtojson from "csvtojson";
import fs from 'fs'

export default class csvToJson{
    public static async convert(filePath: string) {
        let jsonData = await csvtojson().fromFile(filePath);
        fs.unlinkSync(filePath);
        return jsonData;
    }

}
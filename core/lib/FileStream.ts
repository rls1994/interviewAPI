import fs from "fs";
import path from 'path'

export default class FileStream{
    public static uploads = path.join(__dirname, '..', '..', 'uploads');

    static create(dirName:string){
        let p = FileStream.uploads + `/${dirName}`
        if(!fs.existsSync(p)){
            fs.mkdirSync(p);
        }
    }

    static deleteFile(path:string){
        fs.unlinkSync(path)
    }

    static crateUploadDir(){
        if(!fs.existsSync(FileStream.uploads)){
            fs.mkdirSync(FileStream.uploads);
            fs.mkdirSync(FileStream.uploads + '/tmp');
        }
    }
}
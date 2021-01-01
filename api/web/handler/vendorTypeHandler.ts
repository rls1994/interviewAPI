import {NextFunction, Response, Request } from 'express'
import path from 'path'
import '../../../modulepatch/expresspatch'
import VendorTypeCtrl from '../../../core/controller/VendorTypeCtrl';
import VendorTypeResponse from '../../responseFormatter/VendorTypeResponse';
import FileStream from '../../../core/lib/FileStream';
import MoveFile from '../../../core/lib/MoveFile';

const dirctoryName = "vendorType"
const directoryAbsPath =  path.join(__dirname, '..', '..','..', 'uploads', dirctoryName);
const directoryRelPath = `uploads/${dirctoryName}`;


export const getType = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let data = await VendorTypeCtrl.get(req.body);
        req.data = VendorTypeResponse.format(data);
        req.count = data.length;
        next();
    }
    catch (e) {
        next(e)
    }
};

export const addType = async (req: Request, res: Response, next: NextFunction) => {
    try {
        FileStream.create(dirctoryName);
        let image: any = req.file
        if (image) {
            let targetPath = `${directoryAbsPath}/${image.filename}`;
            let pathTosave = `${directoryRelPath}/${image.filename}`;
            MoveFile.move(image.path, targetPath);
            image = pathTosave;
        }
        req.body.image = image;
        let rs = await VendorTypeCtrl.add(req.body);
        req.data = VendorTypeResponse.format(rs);
        req.count = rs.length;
        next()
    }
    catch (e) {
        next(e)
    }
};

export const updateType = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let image: any = req.file
        if (image) {
            let targetPath = `${directoryAbsPath}/${image.filename}`;
            let pathTosave = `${directoryRelPath}/${image.filename}`;
            MoveFile.move(image.path, targetPath);
            image = pathTosave;
        }
        req.body.image = image;
        let rs = await VendorTypeCtrl.update(req.body);
        req.count = 1;
        req.data = VendorTypeResponse.format(rs);
        next()
    }
    catch (e) {
        next(e)
    }
};

export const deleteType = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let obj = {id:req.params.id,isActive: false}
        let rs = await VendorTypeCtrl.update(obj);
        req.count = 1;
        req.data = rs
        next()
    }
    catch (e) {
        next(e)
    }
};



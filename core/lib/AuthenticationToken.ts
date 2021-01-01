import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();

//if interface is changed then you have to manually change the type in expresspatch.ts file
interface  userTokenData {
    id: string,
    phone: string
}

export default class AuthenticationToken{
    static create(data: userTokenData):string{
        const token = jwt.sign({
                id: data.id,
                phone: data.phone
            },
            process.env.SECRET!,
            {
                expiresIn:999999
            }
        );
        return token;
    }

    static verify(token:string){
        try{
            let data = jwt.verify(token,process.env.SECRET!);
            if(typeof data === "object"){
                return data as userTokenData
            }
            else if(typeof data === "boolean"){
                return data as boolean;
            }
            else{
                return false;
            }

        }
        catch(e){
            return false;
        }

    }
}
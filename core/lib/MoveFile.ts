import movefile from "move-file";

export default class MoveFile{
    static move(sourceLocation: string, targetLocation: string){
        movefile.sync(sourceLocation,targetLocation)
    }
}
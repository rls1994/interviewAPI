import { ValidationError } from "../../Error/AppError";

export default class VendorType {
  private title!: string;
  private image: string | null = null;
  private _id: string | null = null;
  private isActive: boolean = true;
  private createdOn: Date | null = null;
  private modifiedOn: Date | null = null;
  constructor(
    title: string,
    image: string | null,
    _id?: string,
    isActive?: boolean,
    createdOn?: Date,
    modifiedOn?: Date
  ) {
    this.setTitle(title);
    if (image) this.setImage(image);
    if (_id) this.setId(_id);
    if(isActive == true || isActive == false) this.isActive = isActive;
    if (createdOn) this.setCreatedOn(createdOn)
    if (modifiedOn) this.setModifiedOn(modifiedOn)
  }

  getId = () => this._id;
  getTitle = () => this.title;
  getImage = () => this.image;
  getStatus = () => this.isActive;
  getCreatedOn = () => this.createdOn;
  getModifiedOn = () => this.modifiedOn;

  private setId = (id: string | null) => {
    this._id = id;
  };
  private setTitle = (title: string) => {
    if (!title) throw new ValidationError("VendorType.title is Required");
    if (typeof title != "string") throw new ValidationError("VendorType.title is Invalid");

    if (title.length > 80)
      throw new ValidationError(
        "VendorType.title length should not be more than 80"
      );
    this.title = title;
  };

  private setImage = (image: string) => {
    if (!image) throw new ValidationError("VendorType.image is Required");
    if (typeof image != "string") throw new ValidationError("VendorType.image is Invalid");

    this.image = image;
  };
  private setCreatedOn = (createdOn: Date)=>{
    this.createdOn = createdOn;
  };
  private setModifiedOn= (modifiedOn: Date)=>{
    this.modifiedOn = modifiedOn;
  };

}

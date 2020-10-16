import { WebAppDTO } from "src/app/shared/dto/web-app-dto";

export class ProductItem implements WebAppDTO.IProductDTO{
    productID: number;
    productName: string;
    productDescription: string;
    productPrice: number;
    productImage: string;
    active: boolean;
    productMarket: string;
    isDicountable: boolean;
    defaultOrderNum: number;
    culture: string;
    code: number;
    sortOrder: number;
    isRecurringCharge: boolean;
    isPillbox: boolean;
    boxModelID: number;
    quantity: number;
   
    get getTotal():number {
        return this.productPrice * this.quantity;
    }

    constructor(model:WebAppDTO.IProductDTO){
        this.productID= model.productID,
        this.productName= model.productName,
        this.productDescription= model.productDescription,
        this.productPrice = model.productPrice,
        this.productImage = model.productImage,
        this.active = model.active,
        this. productMarket = model.productMarket,
        this.isDicountable = model.isDicountable,
        this.defaultOrderNum = model.defaultOrderNum,
        this.culture = model.culture,
        this.code = model.code,
        this.sortOrder = model.sortOrder,
        this.isRecurringCharge = model.isRecurringCharge,
        this.isPillbox = model.isPillbox,
        this.boxModelID = model.boxModelID,
        this.quantity = model.isRecurringCharge ? 1: 0;
    }
    
}

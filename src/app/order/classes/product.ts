import { WebAppDTO } from "src/app/shared/dto/web-app-dto";

export class Product implements WebAppDTO.IProduct {
    productID: number = 0;
    productName: string;
    productDescription: string;
    productPrice: number;
    active: boolean;
    isPillbox: boolean;
    isRecurringCharge: boolean;
    constructor(model?: WebAppDTO.IProduct) {
        if (model) this.setModel(model);
    }

    public setModel(model: WebAppDTO.IProduct): void {
        this.productID = model.productID;
        this.productName = model.productName;
        this.productDescription = model.productDescription;
        this.productPrice = model.productPrice;
        this.active = model.active;
        this.isPillbox = model.isPillbox;
        this.isRecurringCharge = model.isRecurringCharge;
    }

    
}

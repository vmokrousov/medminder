
import { Product } from "./product";
import { WebAppDTO } from "src/app/shared/dto/web-app-dto";

export class OrderDetail implements WebAppDTO.IOrderDetailDTO {
    //interface properties
    public orderDetailID: number;
    public orderID: number;
    public totalNumber: number;
    public totalAmount: number;
    public product: Product;
  
    public summary: string;
    //custom properties
  

    constructor(model: WebAppDTO.IOrderDetailDTO) {
        this.orderDetailID = model.orderDetailID;
        this.orderID = model.orderID;
        this.totalNumber = model.totalNumber;
        this.totalAmount = model.totalAmount;
        this.product = model.product ? new Product(model.product) : null;
       
        this.summary = model.summary;
    }
}
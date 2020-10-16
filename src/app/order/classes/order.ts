
import { WebAppDTO } from "src/app/shared/dto/web-app-dto";
import { OrderDetail } from "./order-detail";


export class Order implements WebAppDTO.IOrderDTO {
    //interface properties
    public orderID?: number;
    public customerEmail: string;
    public createdOn?: Date;
    public orderTotal: number;
    public shippingCost: number;
    public orderComment: string;
    public boxSerials: string;
    public isConsumer: boolean;
    public couponCode?: string;
    public patientZip?: string;
    public paymentInfo: string;
    public creditCard: WebAppDTO.ICreditCard;
    public bankInfo: WebAppDTO.IBankInfo;
    public transactionID: string;
    public subscriptionID: string;
    public oneTimeCost?: number;
    public recurringCost?: number;
    public shippingMethod: WebAppDTO.ShippingMethod;
    public orderStatus: WebAppDTO.OrderStatus;
    public paymentMethod: WebAppDTO.PaymentMethod;
    public summary: string;
    public customerName: string;
    public singleBoxFulfilledOrder?: boolean;
    public shippingAddress: WebAppDTO.IAddress;
    public billingAddress: WebAppDTO.IAddress;
    public orderDetails: OrderDetail[];
    public organization: WebAppDTO.IOrganizationDTO;

  

    constructor(model: WebAppDTO.IOrderDTO) {
        this.orderID = model.orderID;
        this.customerEmail = model.customerEmail;
        this.createdOn = model.createdOn ? new Date(model.createdOn) : null;
        this.orderTotal = model.orderTotal;
        this.shippingCost = model.shippingCost;
        this.orderComment = model.orderComment;
        this.boxSerials = model.boxSerials;
        this.isConsumer = model.isConsumer;
        this.creditCard = model.creditCard;
        this.bankInfo = model.bankInfo;
        this.transactionID = model.transactionID;
        this.subscriptionID = model.subscriptionID;
        this.oneTimeCost = model.oneTimeCost;
        this.recurringCost = model.recurringCost;
        this.shippingMethod = model.shippingMethod;
        this.orderStatus = model.orderStatus;
        this.paymentMethod = model.paymentMethod;
        this.summary = model.summary;
        this.customerName = model.customerName;
        this.shippingAddress = model.shippingAddress;
        this.billingAddress = model.billingAddress;
        this.orderDetails = null;
        this.organization = null;


      
    }





}
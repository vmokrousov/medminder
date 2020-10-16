import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { WebAppDTO } from 'src/app/shared/dto/web-app-dto';
import { Order } from '../classes/order';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.sass']
})
export class CheckoutComponent implements OnInit {
  @ViewChild('form') public form: NgForm;

  public order: Order;

  public ngOnInit(): void {
    this.order = new Order(initOrder);
  }

  public submit(): void {

  }

}

const organization: WebAppDTO.IOrganizationDTO = { organizationID: 1 }
const initOrder: WebAppDTO.IOrderDTO = {
  isConsumer: false,
  shippingMethod: WebAppDTO.ShippingMethod.Standard, // 'Standard',
  orderStatus: WebAppDTO.OrderStatus.New,// 'New',
  customerName: '',
  customerEmail: '',
  customerPhone: '',
  orderComment: '',
  shippingAddress: {
    firstName: '',
    lastName: '',
    street1: '',
    city: '',
    zip: '',
    state: ''
  },
  billingAddress: {
    firstName: '',
    lastName: '',
    street1: '',
    city: '',
    zip: '',
    state: ''
  },
  orderDetails: [] = new Array(),
  orderTotal: 0,
  shippingCost: 0,
  oneTimeCost: 0,
  recurringCost: 0,
  paymentMethod: WebAppDTO.PaymentMethod.CreditCard, //  'CreditCard',
  creditCard: {
    ccType: '',
    ccNumber: '',
    expirationYear: '',
    expirationMonth: '',
    cvv: ''
  },
  bankInfo: {
    bankName: '',
    bankAccountType: 'Checking',
    bankABARoutingNumber: '',
    bankAccountNumber: '',
    bankAccountName: ''

  },
  transactionID: '',
  subscriptionID: '',
  boxSerials: '',
  summary: '',
  organization: organization

}
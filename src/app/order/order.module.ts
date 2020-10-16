import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { OrdersComponent } from './orders/orders.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CreditCardFormComponent } from './credit-card-form/credit-card-form.component';
import { SharedModule } from '../shared/shared.module';


const routes: Routes = [
  {
    path: '', component: OrdersComponent,
    children: [
      { path: 'checkout', component: CheckoutComponent }
    ],

  }
]
@NgModule({

  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    SharedModule,
    HttpClientModule
  ],
  providers: [
  ],
  declarations: [
    OrdersComponent,
    CheckoutComponent,
    CreditCardFormComponent,
  ]
})
export class OrderModule {
  constructor() {
  }
}

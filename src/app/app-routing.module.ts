import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderModule } from './order/order.module';

const routes: Routes = [
  { path: 'order', loadChildren: "./order/order.module#OrderModule" },
  { path: '*', redirectTo: '/order/checkout' },
  { path: '**', redirectTo: '/order/checkout' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }

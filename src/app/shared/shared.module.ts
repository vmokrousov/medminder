import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreditCardNumberFormatterDirective } from './directives/credit-card/credit-card-number-formatter.directive';
import { CreditCardCVVFormatterDirective } from './directives/credit-card/credit-card-cvv-formatter.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    CreditCardNumberFormatterDirective,
    CreditCardCVVFormatterDirective
  ], exports: [
    CreditCardNumberFormatterDirective,
    CreditCardCVVFormatterDirective
  ], providers: [
  ]
})
export class SharedModule { }

import { Component, OnInit, Input } from '@angular/core';
import { NgForm, NgModelGroup } from '@angular/forms';
import { WebAppDTO } from 'src/app/shared/dto/web-app-dto';
@Component({
  selector: 'app-credit-card-form',
  templateUrl: './credit-card-form.component.html',
  styleUrls: ['./credit-card-form.component.sass']
})
export class CreditCardFormComponent implements OnInit {
  @Input() public creditCard: WebAppDTO.ICreditCard;
  public years: number[] = [];
  private year = new Date().getFullYear();

  constructor(public form: NgForm) {
  }

  ngOnInit(): void {
    this.setYears();
  }

  setYears(): void {
    for (var i = 0; i < 10; i++) {
      this.years.push(this.year + i);
    }
  }
}

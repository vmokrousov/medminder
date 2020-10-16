import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, NgForm } from '@angular/forms';

import { CreditCardFormComponent } from './credit-card-form.component';
import { Component, DebugElement, ViewChild } from '@angular/core';
import { WebAppDTO } from 'src/app/shared/dto/web-app-dto';
import { CreditCardNumberFormatterDirective } from 'src/app/shared/directives/credit-card/credit-card-number-formatter.directive';
import { CreditCardCVVFormatterDirective } from 'src/app/shared/directives/credit-card/credit-card-cvv-formatter.directive';
import { By } from "@angular/platform-browser";

describe('CreditCardFormComponent', () => {
  let component: CreditCardFormComponent;
  let fixture: ComponentFixture<CreditCardFormComponent>;
  let testForm: NgForm;

  beforeEach(async(() => {
    testForm = new NgForm(null, null);

    TestBed.configureTestingModule({
      imports: [
        FormsModule
      ],
      declarations: [
        CreditCardFormComponent,
        CreditCardNumberFormatterDirective,
        CreditCardCVVFormatterDirective
      ],
      providers: [
        { provide: NgForm, useValue: testForm }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditCardFormComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });


  it('credit card info validation succeed', () => {
    component.creditCard = { ccType: 'Mastercard', ccNumber: '5424000000000015', expirationYear: '2028', expirationMonth: '10', cvv: '333' };
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      testForm.onSubmit(null);
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        /*
        * Please note: You can also use Luhn’s algorithm to bring your card number validation to the next level :)
        */

        //your code should be here
        fixture.detectChanges();
        expect(component.creditCard.ccType).not.toBeNull();
        expect(component.creditCard.ccNumber).not.toBeNull();
        expect(component.creditCard.expirationYear).not.toBeNull();
        expect(component.creditCard.expirationMonth).not.toBeNull();
        expect(component.creditCard.cvv).not.toBeNull();
        // We can test regex rule directelly or just use directive
        // MasterCard: Starting with 51 through 55, length 16 digits.
        const rx: RegExp =  /^(?:5[1-5][0-9]{14})$/
        expect(component.creditCard.ccNumber).toMatch(rx);  

        expect(component.form.valid).toBe(true);
        
        let inputEl: DebugElement = fixture.debugElement.query(By.css('input'));
      }, error => {
        fail();
      });
    });
  });

  it('credit card number wrong', () => {
    component.creditCard = { ccType: 'Visa' , ccNumber: '0000000000000000', expirationYear: '2029', expirationMonth: '01', cvv: '123' };
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      testForm.onSubmit(null);
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        //your code should be here
        fixture.detectChanges();
        // We can test regex rule directelly or just use directive
        // Visa: Starting with 4, length 13 or 16 digits.
        const rx: RegExp =  /^(?:4[0-9]{12}(?:[0-9]{3})?)$/
        expect(rx.test(component.creditCard.ccNumber)).toBe(false);

        let txtCcNumber = component.form.controls['txtCcNumber'];
       

        // txtCcNumber is invalid
        let errors = txtCcNumber.errors || {};
        expect(errors['pattern']).toBe(true);

      }, error => {
        fail();
      });
    });
  });

  it('credit card expiration date wrong', () => {
    component.creditCard = { ccType: 'American Express' , ccNumber: '370000000000002', expirationYear: '2029', expirationMonth: '', cvv: '1234' };
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      testForm.onSubmit(null);
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        //your code should be here
        fixture.detectChanges();
        expect(component.creditCard.expirationMonth).not.toBeNull();
        expect(component.creditCard.expirationYear).not.toBeNull();

        let expirationMonth = component.form.controls['expirationMonth'];
       
        // expirationMonth is required
        let errors = expirationMonth.errors || {};
        //expect(errors['required']).toBe(true);
        expect(errors['pattern']).toBe(true);
      }, error => {
        fail();
      });
    });
  });

  it('credit card cvv wrong', () => {
    component.creditCard = { ccType: 'American Express' , ccNumber: '370000000000002', expirationYear: '2029', expirationMonth: '12', cvv: 'abc' };
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      testForm.onSubmit(null);
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        //your code should be here
        fixture.detectChanges();
        let cvv = component.form.controls['cvv'];
        // cvv is invalid
        let errors = cvv.errors || {};
        expect(errors['pattern']).toBe(true);
      }, error => {
        fail();
      });
    });
  });
});

@Component(
  {
    selector: 'test-cmp',
    template: '<form #form="ngForm" (ngSubmit)="submit()"><app-credit-card-form [creditCard]="creditCard" [parentForm]="testForm"></app-credit-card-form><input type="submit" id="btnSubmit" value="Save" /></form>'
  })
class TestComponent {
  @ViewChild('form') public testForm: NgForm;
  public creditCard: WebAppDTO.ICreditCard;
  public submit(): void { }
}
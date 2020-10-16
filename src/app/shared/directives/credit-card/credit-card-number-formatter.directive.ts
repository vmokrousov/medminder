import { Directive, forwardRef, HostListener, Renderer2, ElementRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, ControlValueAccessor, Validator, ValidationErrors, AbstractControl } from '@angular/forms';

const creditCardTypes: ICreditCardType[] = [
  { type: "VISA", rx: /^(?:4[0-9]{12}(?:[0-9]{3})?)$/, active: true, separation: /^([0-9]{4})([0-9]{4})?([0-9]{4})?([0-9]{4})?$/ },
  { type: "Master Card", rx: /^(?:5[1-5][0-9]{14})$/, active: true, separation: /^([0-9]{4})([0-9]{4})?([0-9]{4})?([0-9]{4})?$/ },
  { type: "JCB", rx: /^(?:(?:2131|1800|35\d{3})\d{11})$/, active: false, separation: /^([0-9]{4})([0-9]{4})?([0-9]{4})?([0-9]{4})?$/ },
  { type: "Discover", rx: /^(?:6(?:011|5[0-9][0-9])[0-9]{12})$/, active: true, separation: /^([0-9]{4})([0-9]{4})?([0-9]{4})?([0-9]{4})?$/ },
  { type: "Diners", rx: /^(?:3(?:0[0-5]|[68][0-9])[0-9]{11})$/, active: false, separation: /^([0-9]{4})([0-9]{4})?([0-9]{4})?(?:([0-9]{4})([0-9]{4})([0-9]{2}))?$/ },
  { type: "American Express", rx: /^(?:3[47][0-9]{13})$/, active: true, separation: /^([0-9]{4})([0-9]{6})?(?:([0-9]{6})([0-9]{5}))?$/ }
];

@Directive({
  selector: 'input[credit-card-number]',
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => CreditCardNumberFormatterDirective), multi: true },
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => CreditCardNumberFormatterDirective), multi: true }]
})
export class CreditCardNumberFormatterDirective implements ControlValueAccessor, Validator {

  private el: HTMLInputElement;
  private model: string;

  constructor(
    private readonly _renderer: Renderer2,
    private readonly _elementRef: ElementRef) {
    this.el = this._elementRef.nativeElement;
    console.log("CreditCardFormatterDirective constructor");
  }

  //this is internal callback. Will be replaced
  private onValidatorChangeCallback = (...args) => { };
  //this is internal callback. Will be replaced
  private onChangeCallback = (...args) => { };
  //this is internal callback. Will be replaced
  public onTouchedCallback(...args): void { };


  @HostListener('keyup', ['$event.target.value'])
  public onChange(value: any): void {
    this.model = this.isValid(value) ? this.parse(value) : value;

    this.onChangeCallback(this.model);

  };

  @HostListener("focus", ["$event.target.value"])
  public onFocus(): void {
    if (this.model === undefined) {
      this._renderer.setAttribute(this.el, 'value', null);
      return;
    }
    this._renderer.setAttribute(this.el, 'value', this.model);
    this.el.select();
  }

  @HostListener("blur", ['$event.target.value'])
  onBlur(value: string): void {
    var newValue = this.parse(value);
    if (newValue !== null) {
      let formatted = this.transform(newValue);
      this._renderer.setAttribute(this.el, 'value', formatted);
      this.onChangeCallback(newValue);
    } else
      this.onChangeCallback(value);
    this.onTouchedCallback();
  }

  public writeValue(value: string): void {
    if (value === undefined || value === null) {
      this._renderer.setAttribute(this.el, 'value', null);
      return;
    }
    this.model = value;
    var formatted = this.transform(value);
    this._renderer.setAttribute(this.el, 'value', formatted);
  }

  public registerOnChange(fn: any): void { this.onChangeCallback = fn; }
  public registerOnTouched(fn: any): void { this.onTouchedCallback = fn; }

  public setDisabledState(isDisabled: boolean): void {
    this._renderer.setAttribute(this.el, 'disabled', isDisabled ? 'disabled' : '');
  }

  public validate(c: AbstractControl): ValidationErrors {
    if (!this.isValid(c.value))
      return { 'Not valid credit card': { "value": c.value, "pattern": "this.inputRegExp " } };
  }

  public registerOnValidatorChange?(fn: () => any): void { this.onValidatorChangeCallback = fn; }

  private isValid(value: string) {
    return creditCardTypes.filter(cc => cc.active).some(cc => cc.rx.test(value));
  }

  private parse(value: string): string {
    if (!this.isValid(value)) return null;
    // const res = phoneRx.exec(value);
    // if (res.length == 5) return res[1] + res[2] + res[3] + res[4];
    return value;
  }

  private transform(value: string): string {
    if (!this.isValid(value)) return `${value}`;
    let rr = creditCardTypes.filter(cc => cc.active).find(cc => cc.rx.test(value));
    let sections = rr.separation.exec(value);
    if (!sections || sections.length <= 1)
      return `${value}`;
    return sections.slice(1).join(" ");
  }

}

interface ICreditCardType {
  type: string;
  rx: RegExp;
  active: boolean;
  separation: RegExp;
}
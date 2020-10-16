import { Directive, forwardRef, HostListener, Renderer2, ElementRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, ControlValueAccessor, Validator, ValidationErrors, AbstractControl } from '@angular/forms';

const creditCardCVVRx = /^([0-9]{3,4})/;

@Directive({
  selector: 'input[credit-card-cvv]',
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => CreditCardCVVFormatterDirective), multi: true },
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => CreditCardCVVFormatterDirective), multi: true }]
})
export class CreditCardCVVFormatterDirective implements ControlValueAccessor, Validator {

  private el: HTMLInputElement;
  private model: string;

  constructor(
    private readonly _renderer: Renderer2,
    private readonly _elementRef: ElementRef) {
    this.el = this._elementRef.nativeElement;
    console.log("CreditCardCVVFormatterDirective constructor");
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
      this._renderer.setAttribute(this.el, 'value', newValue);
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
    this._renderer.setAttribute(this.el, 'value', value);
  }

  public registerOnChange(fn: any): void { this.onChangeCallback = fn; }
  public registerOnTouched(fn: any): void { this.onTouchedCallback = fn; }

  public setDisabledState(isDisabled: boolean): void {
    this._renderer.setAttribute(this.el, 'disabled', isDisabled ? 'disabled' : '');
  }

  public validate(c: AbstractControl): ValidationErrors {
    if (!this.isValid(c.value))
      return { 'Not valid credit card cvv': { "value": c.value, "pattern": "this.inputRegExp " } };
  }

  public registerOnValidatorChange?(fn: () => any): void { this.onValidatorChangeCallback = fn; }

  private isValid(value: string) {
    return creditCardCVVRx.test(value);
  }

  private parse(value: string): string {
    if (!this.isValid(value)) return null;
    // const res = phoneRx.exec(value);
    // if (res.length == 5) return res[1] + res[2] + res[3] + res[4];
    return value;
  }
}
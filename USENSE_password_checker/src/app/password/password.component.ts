import { Component, forwardRef } from '@angular/core';
import { PasswordStrengthCheckerService } from '../services/password-strength-checker.service';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PasswordComponent),
      multi: true,
    },
  ],
})
export class PasswordComponent implements ControlValueAccessor {
  public password: string = '';
  onChange: any = () => {};
  onTouched: any = () => {};

  public get passwordStrengthString(): string {
    return this.password.length < 8 ||
      this._passwordStrengthService.checkPasswordStrength(this.password) ===
        'easy'
      ? 'Your password is weak'
      : this._passwordStrengthService.checkPasswordStrength(this.password) ===
        'medium'
      ? 'Your password is not strong enough'
      : this._passwordStrengthService.checkPasswordStrength(this.password) ===
        'strong'
      ? 'Your password is great'
      : 'Your password is weak';
  }

  public get firstBlockClass(): string {
    return this._passwordStrengthService.checkPasswordStrength(
      this.password
    ) === 'strong'
      ? 'green'
      : this._passwordStrengthService.checkPasswordStrength(this.password) ===
        'medium'
      ? 'yellow'
      : (this.password.length < 8 && this.password.length > 0) ||
        this._passwordStrengthService.checkPasswordStrength(this.password) ===
          'easy'
      ? 'red'
      : 'gray';
  }

  public get secondBlockClass(): string {
    return this._passwordStrengthService.checkPasswordStrength(
      this.password
    ) === 'strong'
      ? 'green'
      : this._passwordStrengthService.checkPasswordStrength(this.password) ===
        'medium'
      ? 'yellow'
      : this.password.length < 8 && this.password.length > 0
      ? 'red'
      : 'gray';
  }

  public get thirdBlockClass(): string {
    return this._passwordStrengthService.checkPasswordStrength(
      this.password
    ) === 'strong'
      ? 'green'
      : this.password.length < 8 && this.password.length > 0
      ? 'red'
      : 'gray';
  }

  constructor(
    private readonly _passwordStrengthService: PasswordStrengthCheckerService
  ) {}

  writeValue(value: string): void {
    if (value) {
      this.password = value;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onPasswordChange() {
    this.onChange(this.password);
    this.onTouched();
  }
}

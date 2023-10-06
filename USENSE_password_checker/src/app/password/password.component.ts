import { Component } from '@angular/core';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss'],
})
export class PasswordComponent {
  public password: string = '';
  public passwordStrength: string = '';

  public get passwordStrengthString(): string {
    return this.password.length < 8 || this.passwordStrength === 'easy'
      ? 'Your password is weak'
      : this.passwordStrength === 'medium'
      ? 'Your password is not strong enough'
      : this.passwordStrength === 'strong'
      ? 'Your password is great'
      : 'Your password is weak';
  }

  checkPasswordStrength() {
    if (this.password.length === 0) {
      this.passwordStrength = '';
    } else if (this.password.length < 8) {
      this.passwordStrength = 'easy';
    } else {
      const hasLetters = /[a-zA-Z]/.test(this.password);
      const hasDigits = /[0-9]/.test(this.password);
      const hasSymbols = /[^a-zA-Z0-9]/.test(this.password);

      if (hasLetters && hasDigits && hasSymbols) {
        this.passwordStrength = 'strong';
      } else if (
        (hasLetters && hasDigits) ||
        (hasLetters && hasSymbols) ||
        (hasDigits && hasSymbols)
      ) {
        this.passwordStrength = 'medium';
      } else {
        this.passwordStrength = 'easy';
      }
    }
  }
}

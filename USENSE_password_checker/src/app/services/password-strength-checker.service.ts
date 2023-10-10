import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PasswordStrengthCheckerService {
  constructor() {}

  checkPasswordStrength(password: string): string {
    if (password.length === 0) {
      return '';
    } else if (password.length < 8) {
      return 'easy';
    } else {
      const hasLetters = /[a-zA-Z]/.test(password);
      const hasDigits = /[0-9]/.test(password);
      const hasSymbols = /[^a-zA-Z0-9]/.test(password);

      if (hasLetters && hasDigits && hasSymbols) {
        return 'strong';
      } else if (
        (hasLetters && hasDigits) ||
        (hasLetters && hasSymbols) ||
        (hasDigits && hasSymbols)
      ) {
        return 'medium';
      } else {
        return 'easy';
      }
    }
  }
}

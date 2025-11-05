import { AbstractControl } from '@angular/forms';

export function ValidatePhone(control: AbstractControl): { invalidPhone: boolean } | null {
  const PHONE_REGEXP = /^[(]{0,1}[0-9]{3}[)\.\- ]{0,1}[0-9]{3}[\.\- ]{0,1}[0-9]{4}$/;
  return !PHONE_REGEXP.test(control.value) ? { invalidPhone: true } : null;
}
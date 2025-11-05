import { AbstractControl } from '@angular/forms';

export function ValidatePostal(control: AbstractControl): { invalidPostal: boolean } | null {
const POSTAL_REGEXP = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;
  return !POSTAL_REGEXP.test(control.value) ? { invalidPostal: true } : null;
}
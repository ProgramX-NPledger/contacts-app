import { AbstractControl, ValidationErrors } from "@angular/forms";

export function restrictedFormValidator(control: AbstractControl): ValidationErrors | null {
  const forbiddenNames = ['admin', 'root'];
  const isForbidden = control.value.includes(forbiddenNames[0]);
  return isForbidden ? { restricted: true } : null;
}
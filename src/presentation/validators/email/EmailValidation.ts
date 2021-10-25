import { InvalidFieldError } from '../errors/InvalidFieldError';
import { FieldValidation } from '../repositories/FieldValidation';

export class EmailValidation implements FieldValidation {
  constructor(readonly field: string) { };
  validate(value: string): string {
    const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    return emailRegex.test(value) ? "" : new InvalidFieldError().message
  }

}
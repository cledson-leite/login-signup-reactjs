import { InvalidFieldError } from '../errors/InvalidFieldError';
import { FieldValidation } from '../repositories/FieldValidation';

export class EmailValidation implements FieldValidation {
  constructor(readonly field: string) { };
  validate(value: string): string {
    return new InvalidFieldError().message
  }

}
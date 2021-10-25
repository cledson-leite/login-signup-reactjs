import { InvalidFieldError } from '../errors/InvalidFieldError';
import { FieldValidation } from '../repositories/FieldValidation';

export class MinLength implements FieldValidation{
  constructor(readonly field: string, private readonly length: number){};
  validate(value: string): string {
    return value.length >=this.length ? "" : new InvalidFieldError().message
  }
}
import { RequiredFieldError } from './errors/RequiredFieldError';
import { FieldValidation } from './repositories/FieldValitation';

export class RequiredField implements FieldValidation {
  constructor(readonly field: string) { };
  validate(value: string): Error {
    return new RequiredFieldError()
  }

}
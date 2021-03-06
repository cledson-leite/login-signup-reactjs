import { RequiredFieldError } from '../errors/RequiredFieldError'
import { FieldValidation } from '../repositories/FieldValidation'

export class RequiredField implements FieldValidation {
  constructor (readonly field: string) {};
  validate (value: string): Error | null {
    return value ? null : new RequiredFieldError()
  }
}

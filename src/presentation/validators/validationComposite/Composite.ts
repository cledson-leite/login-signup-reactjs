import { Validation } from '../../repositories/validation/IValidation'
import { FieldValidation } from '../repositories/FieldValidation'

export class ValidationComposite implements Validation {
  constructor(private readonly validators: FieldValidation[]) { };
  validate(name: string, value: string): string {
    const validators = this.validators.filter(v => v.field === name)
    for (const validator of validators) {
      const error = validator.validate(value)
      if (error) return error.message
    }
    return ''
  }
}

import { EmailValidation } from '../../validators/email/EmailValidation'
import { FieldValidation } from '../../validators/repositories/FieldValidation'
import { RequiredField } from '../../validators/requiredFields/RequiredField'

export class ValidationBuilder {
  private constructor(
    private readonly fieldName: string,
    private readonly validations: FieldValidation[],
  ) { }

  static field(name: string): ValidationBuilder {
    return new ValidationBuilder(name, [])
  }

  required(): ValidationBuilder {
    this.validations.push(new RequiredField(this.fieldName))
    return this
  }

  email(): ValidationBuilder {
    this.validations.push(new EmailValidation(this.fieldName))
    return this
  }

  build(): FieldValidation[] {
    return this.validations
  }
}
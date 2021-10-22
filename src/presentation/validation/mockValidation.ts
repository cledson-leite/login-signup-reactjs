import { Validation } from './IValidation'

export class ValidationSpy implements Validation {
  errorMessage!: string
  fieldName!: string
  fieldValue!: string

  validate(name: string, value: string): string {
    this.fieldName = name
    this.fieldValue = value
    return this.errorMessage
  }
}
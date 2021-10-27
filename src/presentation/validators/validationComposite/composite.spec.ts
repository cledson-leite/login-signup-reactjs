import { ValidationComposite } from './Composite'
import { FieldValidationSpy } from './mock/FieldValidationSpy'

type SutTypes = {
  sut: ValidationComposite,
  fieldValidationsSpy: FieldValidationSpy[]
}

const makeSut = (): SutTypes => {
  const fieldValidationsSpy = [
    new FieldValidationSpy('any_field'),
    new FieldValidationSpy('any_field')
  ]
  const sut = new ValidationComposite(fieldValidationsSpy)

  return {
    sut,
    fieldValidationsSpy
  }
}

describe('Validation Composite', () => {
  it('Should return error if any validation fails', () => {
    //produz os dados do teste
    const { sut, fieldValidationsSpy } = makeSut()
    fieldValidationsSpy[0].error = new Error('first_error_message')
    fieldValidationsSpy[1].error = new Error('second_error_message')
    //operacionar esses dados
    const error = sut.validate('any_field', 'any_value')
    //verificar resultado esperado
    expect(error).toBe('first_error_message')
    
  })
})
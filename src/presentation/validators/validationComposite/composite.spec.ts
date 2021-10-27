import { ValidationComposite } from './Composite'
import { FieldValidationSpy } from './mock/FieldValidationSpy'

describe('Validation Composite', () => {
  it('Should return error if any validation fails', () => {
    //produz os dados do teste
    const fieldValidationSpy = new FieldValidationSpy('any_field')
    const fieldValidationSpy2 = new FieldValidationSpy('any_field')
    fieldValidationSpy2.error = new Error('any_error_message')
    const sut = new ValidationComposite([
      fieldValidationSpy,
      fieldValidationSpy2
    ])
    //operacionar esses dados
    const error = sut.validate('any_field', 'any_value')
    //verificar resultado esperado
    expect(error).toBe('any_error_message')
    
  })
})
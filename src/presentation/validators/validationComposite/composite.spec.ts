import faker from 'faker'

import { ValidationComposite } from './Composite'
import { FieldValidationSpy } from './mock/FieldValidationSpy'

type SutTypes = {
  sut: ValidationComposite,
  fieldValidationsSpy: FieldValidationSpy[]
}

const makeSut = (fieldName: string): SutTypes => {
  const fieldValidationsSpy = [
    new FieldValidationSpy(fieldName),
    new FieldValidationSpy(fieldName)
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
    const fieldName = faker.database.column()
    const { sut, fieldValidationsSpy } = makeSut(fieldName)
    const errorMessage = faker.random.words()
    fieldValidationsSpy[0].error = new Error(errorMessage)
    fieldValidationsSpy[1].error = new Error(faker.random.words())
    //operacionar esses dados
    const error = sut.validate(fieldName, faker.random.word())
    //verificar resultado esperado
    expect(error).toBe(errorMessage)
    
  })
  
  it('Should return false if no validation fails', () => {
    //produz os dados do teste
    const fieldName = faker.database.column()
    const { sut, fieldValidationsSpy } = makeSut(fieldName)
    //operacionar esses dados
    const error = sut.validate(fieldName, faker.random.word())
    //verificar resultado esperado
    expect(error).toBeFalsy()
    
  })
})
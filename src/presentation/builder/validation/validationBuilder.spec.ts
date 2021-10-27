import faker from 'faker'

import { MinLength } from '../../validators/minLength/MinLength';
import { EmailValidation } from '../../validators/email/EmailValidation';
import { RequiredField } from '../../validators/requiredFields/RequiredField';

import { ValidationBuilder as sut } from './ValidationBuilder';

describe('Validation builder', () => {
  it('Should return RequiredFieldValidation', () => {
    //produz os dados do teste
    const fieldName = faker.database.column()

    //operacionar esses dados
    const validations = sut.field(fieldName).required().build()
    //verificar resultado esperado
    expect(validations).toEqual([
      new RequiredField(fieldName)
    ])
  })
  
  it('Should return EmailValidation', () => {
    //produz os dados do teste
    const fieldName = faker.database.column()

    //operacionar esses dados
    const validations = sut.field(fieldName).email().build()
    //verificar resultado esperado
    expect(validations).toEqual([
      new EmailValidation(fieldName)
    ])
  })
  
  it('Should return MinLengthValidation', () => {
    //produz os dados do teste
    const fieldName = faker.database.column()

    //operacionar esses dados
    const validations = sut.field(fieldName).min(5).build()
    //verificar resultado esperado
    expect(validations).toEqual([
      new MinLength(fieldName,5)
    ])
  })
})
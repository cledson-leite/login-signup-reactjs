import faker from 'faker'

import { InvalidFieldError } from '../errors/InvalidFieldError'
import { EmailValidation } from './EmailValidation'

const makeSut = (): EmailValidation => new EmailValidation('email')

describe('Email validation', () => {
  it('Should return error if email is invalid', () => {
    // produz os dados do teste
    const sut = makeSut()
    // operacionar esses dados
    const error = sut.validate(faker.random.word())
    // verificar resultado esperado
    expect(error?.message).toBe(new InvalidFieldError().message)
  })

  it('Should return falsy if email is valid', () => {
    // produz os dados do teste
    const sut = makeSut()
    // operacionar esses dados
    const error = sut.validate(faker.internet.email())
    // verificar resultado esperado
    expect(error).toBeFalsy()
  })
})

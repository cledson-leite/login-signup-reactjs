import faker from 'faker'
import { InvalidFieldError } from '../errors/InvalidFieldError'
import { MinLength } from './MinLength'

const makeSut = (length: number = 5): MinLength => {
  return new MinLength(faker.database.column(), length)
}

describe('Min Length', () => {
  it('Should return error if value is invalid', () => {
    // produz os dados do teste
    const sut = makeSut()
    // operacionar esses dados
    const error = sut.validate(faker.random.alphaNumeric(4))
    // verificar resultado esperado
    expect(error?.message).toBe(new InvalidFieldError().message)
  })

  it('Should return falsy if value is valid', () => {
    // produz os dados do teste
    const sut = makeSut()
    // operacionar esses dados
    const error = sut.validate(faker.random.alphaNumeric(6))
    // verificar resultado esperado
    expect(error).toBeFalsy()
  })
})

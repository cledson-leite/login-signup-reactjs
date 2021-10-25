import faker from 'faker'
import { InvalidFieldError } from '../errors/InvalidFieldError'
import { MinLength } from './MinLenght'

const makeSut = (length: number = 5): MinLength => {
  return new MinLength(faker.database.column(), length)
}

describe('Min Length', () => {
  it('Should return error if value is invalid', () => {
    //produz os dados do teste
    const sut = makeSut()
    //operacionar esses dados
    const error = sut.validate('123')
    //verificar resultado esperado
    expect(error).toBe(new InvalidFieldError().message)
  })
})
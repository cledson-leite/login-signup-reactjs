import { InvalidFieldError } from '../errors/InvalidFieldError';
import { EmailValidation } from './EmailValidation';




const makeSut = (): EmailValidation => new EmailValidation('email')

describe('Email validation', () => {
  it('Should return error if email is invalid', () => {
    //produz os dados do teste
    const sut = makeSut( )
    //operacionar esses dados
    const error = sut.validate('')    
    //verificar resultado esperado
    expect(error).toBe(new InvalidFieldError().message)
  })
})
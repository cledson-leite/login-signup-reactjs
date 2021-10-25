import faker from 'faker'

import { RequiredFieldError } from '../../validators/errors/RequiredFieldError'
import { RequiredField } from './RequiredField'

const makeSut = (): RequiredField => new RequiredField(faker.database.column())

describe('Required Fields', () => {
  it('Should return error if field is empty', () => {
    //produz os dados do teste
      const sut = makeSut()
    //operacionar esses dados
      const error = sut.validate('')
    //verificar resultado esperado
      expect(error).toBe(new RequiredFieldError().message)
    
  })

  it('Should return falsy if field is not empty', () => {
    //produz os dados do teste
      const sut = new RequiredField('email')
    //operacionar esses dados
      const error = sut.validate(faker.random.word())
    //verificar resultado esperado
      expect(error).toBeFalsy()
    
  })
})
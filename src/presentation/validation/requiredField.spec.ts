import { RequiredFieldError } from './errors/RequiredFieldError'
import { RequiredField } from './RequiredField'

describe('Required Fields', () => {
  it('Should return error if field is empty', () => {
    //produz os dados do teste
      const sut = new RequiredField('email')
    //operacionar esses dados
      const error = sut.validate('')
    //verificar resultado esperado
      expect(error).toEqual(new RequiredFieldError())
    
  })
})
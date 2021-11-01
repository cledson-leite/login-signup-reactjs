import { ValidationBuilder } from
  '../../../../presentation/builder/validation/ValidationBuilder'
import { ValidationComposite } from
  '../../../../presentation/validators/validationComposite/Composite'
import { makeLoginValidation } from './loginValidationFactory'

describe('Login validation factory', () => {
  it('Should make ValidationComposite with correct validation', () => {
    // produz os dados do teste
    const composite = makeLoginValidation()
    // operacionar esses dados
    const validationComposite = ValidationComposite.build([
      ...ValidationBuilder.field('email').required().email().build(),
      ...ValidationBuilder.field('password').required().min(5).build()
    ])
    // verificar resultado esperado
    expect(composite).toEqual(validationComposite)
  })
})

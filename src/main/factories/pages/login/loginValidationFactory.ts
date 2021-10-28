import { ValidationComposite } from
  '../../../../presentation/validators/validationComposite/Composite'
import { ValidationBuilder } from '../../../../presentation/builder/validation/ValidationBuilder'

export const makeLoginValidation = (): ValidationComposite => {
  return ValidationComposite.build([
    ...ValidationBuilder.field('email').required().email().build(),
    ...ValidationBuilder.field('password').required().min(5).build(),
  ])
}

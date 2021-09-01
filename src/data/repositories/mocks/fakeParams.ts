import { AuthenticationParams } from '@usecases/Authentication';

import faker from 'faker'

export const fakerParams = (): AuthenticationParams => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})
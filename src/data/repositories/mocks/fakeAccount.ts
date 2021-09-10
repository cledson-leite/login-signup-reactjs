import faker from 'faker'
import { Account } from '@entities/Account';

export const fakeAccount = (): Account => ({
  accessToken: faker.datatype.uuid()
});
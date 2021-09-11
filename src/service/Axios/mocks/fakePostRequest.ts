import faker from 'faker'

import { ApiPostClientParams } from '@datasource/ApiPostClient';

export const fakePostRequest = (): ApiPostClientParams<any> => ({
  url: faker.internet.url(),
  body: faker.random.objectElement()
})
import { RemoteAuthentication } from '@repositories/remoteAuthentication/RemoteAuthentication'
import { ApiPostClientSpy } from '@repositories/mocks/ApiPostClientSpy'
import { fakerParams } from '@repositories/mocks/fakeParams'

import faker from 'faker'

type TypeSut = {
  sut: RemoteAuthentication,
  api: ApiPostClientSpy
}

const makeSut = (url: string = faker.internet.url()): TypeSut => {
  const apiPostClient = new ApiPostClientSpy()
  const sut = new RemoteAuthentication(url, apiPostClient)
  
  return {sut, api:apiPostClient}
}

describe('Remote Authentication', () => {
  it('Should call the ApiPostClient with the correct url', () => {
    //produz os dados do teste
    const url = faker.internet.url()
    const { sut, api } = makeSut(url)
    const params = fakerParams()
    //operacional esses dados
    sut.auth(params)
    //verificar resultado esperado
    expect(api.url).toBe(url)
  })

  it('Should call the ApiPostClient with the correct body', () => {
    //produz os dados do teste
    const { sut, api } = makeSut()
    const params = fakerParams()

    //operacional esses dados
    sut.auth(params)
    //verificar resultado esperado
    expect(api.body).toEqual(params)
  })
})
import { ApiStatusCode } from '@datasource/api/ApiResopnse'
import { RemoteAuthentication } from '@repositories/remoteAuthentication/RemoteAuthentication'
import { ApiPostClientSpy } from '@repositories/mocks/ApiPostClientSpy'
import { fakerParams } from '@repositories/mocks/fakeParams'
import { InvalidCredencialsError } from '@repositories/errors/InvalidCredencialsError'

import faker from 'faker'
import { UnexpectedError } from '@repositories/errors/UnexpectedError'

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

  it('Should throw InvalidCredentialError if ApiPostClient returns 401', async () => {
    //produz os dados do teste
    const { sut, api } = makeSut()
    api.response = {
      statusCode: ApiStatusCode.unauthorized
    }
    //operacionar esses dados
    const promise = sut.auth(fakerParams())
    //verificar resultado esperado
    await expect(promise).rejects.toThrow(new InvalidCredencialsError())
  })

  it('Should throw UnexpectedError if ApiPostClient returns 400', async () => {
    //produz os dados do teste
    const { sut, api } = makeSut()
    api.response = {
      statusCode: ApiStatusCode.BadRequest
    }
    //operacionar esses dados
    const promise = sut.auth(fakerParams())
    //verificar resultado esperado
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('Should throw UnexpectedError if ApiPostClient returns 404', async () => {
    //produz os dados do teste
    const { sut, api } = makeSut()
    api.response = {
      statusCode: ApiStatusCode.notFound
    }
    //operacionar esses dados
    const promise = sut.auth(fakerParams())
    //verificar resultado esperado
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('Should throw UnexpectedError if ApiPostClient returns 500', async () => {
    //produz os dados do teste
    const { sut, api } = makeSut()
    api.response = {
      statusCode: ApiStatusCode.serverError
    }
    //operacionar esses dados
    const promise = sut.auth(fakerParams())
    //verificar resultado esperado
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })
})
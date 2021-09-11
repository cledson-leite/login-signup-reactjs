import axios from 'axios'
import faker from 'faker'

import { fakePostRequest } from './mocks/fakePostRequest';
import { AxiosClient } from '@service/Axios/AxiosClient'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

const result = {
  status: faker.datatype.number(),
  data: faker.random.objectElement()
}
mockedAxios.post.mockResolvedValue(result)

const makeSut = (): AxiosClient => {
  return new AxiosClient()
}

describe('Axios Client', () => {
  it('Should call axios with the correct URL verb and body', async () => {
    //produz os dados do teste
    const request = fakePostRequest()
    const sut = makeSut()
    //operacionar esses dados
    await sut.post(request)
    //verificar resultado esperado
    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body)
  })
  
  it('Should return the correct statusCode and body', async () => {
    //produz os dados do teste
    const request = fakePostRequest()
    const sut = makeSut()
    //operacionar esses dados
    const responde = await sut.post(request)
    //verificar resultado esperado
    expect(responde).toEqual({
      statusCode: result.status,
      body: result.data
    })
  })
})
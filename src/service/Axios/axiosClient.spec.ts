import axios from 'axios'
import faker from 'faker'

import { fakePostRequest } from './mocks/fakePostRequest';
import { AxiosClient } from '@service/Axios/AxiosClient'
import { mockApiResponse, mockAxios } from './mocks/mockAxios';

jest.mock('axios')

type SutTypes = {
  sut: AxiosClient,
  mockedAxios: jest.Mocked<typeof axios>
}

const makeSut = (): SutTypes => {
  const sut = new AxiosClient()
  const mockedAxios = mockAxios()
  return { sut, mockedAxios}
}

describe('Axios Client', () => {
  it('Should call axios with the correct URL verb and body', async () => {
    //produz os dados do teste
    const request = fakePostRequest()
    const {sut, mockedAxios} = makeSut()
    //operacionar esses dados
    await sut.post(request)
    //verificar resultado esperado
    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body)
  })
  
  it('Should return the correct statusCode and body', async () => {
    //produz os dados do teste
    const request = fakePostRequest()
    const { sut, mockedAxios } = makeSut()
    //operacionar esses dados
    const responde = await sut.post(request)
    const result = await mockedAxios.post.mock.results[0].value
    //verificar resultado esperado
    expect(responde).toEqual({
      statusCode: result.status,
      body: result.data
    })
  })
  
  it('Should return the correct statusCode and body on failure', async () => {
    //produz os dados do teste
    const request = fakePostRequest()
    const { sut, mockedAxios } = makeSut()
    mockedAxios.post.mockRejectedValueOnce({
      response: mockApiResponse()
    })
    //operacionar esses dados
    const promise = sut.post(request)
    //verificar resultado esperado
    expect(promise).toEqual(mockedAxios.post.mock.results[0].value)
    
  })
})
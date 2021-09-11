import axios from 'axios'

import { fakePostRequest } from './mocks/fakePostRequest';
import { AxiosClient } from '@service/Axios/AxiosClient'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

const makeSut = (): AxiosClient => {
  return new AxiosClient()
}

describe('Axios Client', () => {
  it('Should call axios with the correct URL verb and body', () => {
    //produz os dados do teste
    const request = fakePostRequest()
    const sut = makeSut()
    //operacionar esses dados
    sut.post(request)
    //verificar resultado esperado
    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body)
  })
})
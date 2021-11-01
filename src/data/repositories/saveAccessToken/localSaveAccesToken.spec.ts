import { SetStorageSpy } from '@repositories/mocks/setStorageSpy'
import faker from 'faker'
import { LocalSaveAccessToken } from './localSaveAccessToken'

type SutTypes = {
  sut: LocalSaveAccessToken
  setStorageSpy: SetStorageSpy
}

const makeSut = (): SutTypes => {
  const setStorageSpy = new SetStorageSpy()
  const sut = new LocalSaveAccessToken(setStorageSpy)
  return {
    sut, setStorageSpy
  }
}
describe('Local save access token', () => {
  it('Should call SetStorage with correct value', async () => {
    // produz os dados do teste
    const { sut, setStorageSpy } = makeSut()
    const accessToken = faker.datatype.uuid()
    // operacionar esses dados
    await sut.save(accessToken)
    // verificar resultado esperado
    expect(setStorageSpy.key).toBe('accessToken')
    expect(setStorageSpy.value).toBe(accessToken)
  })
})

import { SetStorage } from '@datasource/SetStorage'
import { SaveAccessToken } from '@usecases/saveAccessToken'

export class LocalSaveAccessToken implements SaveAccessToken {
  constructor (private readonly setStorage: SetStorage) { };
  async save (accessToken: string): Promise<void> {
    await this.setStorage.set('accessToken', accessToken)
  }
}

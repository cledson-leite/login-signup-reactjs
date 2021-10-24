import { Account } from '@entities/Account'
import { fakeAccount } from '@repositories/mocks/fakeAccount'
import { Authentication, AuthenticationParams } from '@usecases/Authentication'

export class AuthenticationSpy implements Authentication {
  account = fakeAccount()
  params!: AuthenticationParams
  async auth(params: AuthenticationParams): Promise<Account> {
    this.params = params
    return Promise.resolve(this.account)
  }
}
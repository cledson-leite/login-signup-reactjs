import { AuthenticationParams } from '@usecases/Authentication';
import { ApiPostClient } from '@datasource/ApiPostClient';
import { ApiStatusCode } from '@datasource/api/ApiResponse';
import { UnexpectedError } from '@repositories/errors/UnexpectedError';
import { Account } from '@entities/Account';
import { InvalidCredentialsError } from '@repositories/errors/InvalidCredentialsError';

export class RemoteAuthentication {
  constructor(
    private readonly url: string,
    private readonly api: ApiPostClient<AuthenticationParams, Account>
  ) { };
  async auth(params: AuthenticationParams): Promise<void> {
    const apiResponse = await this.api.post({
      url: this.url,
      body: params
    })
    switch (apiResponse.statusCode) {
      case ApiStatusCode.ok: break
      case ApiStatusCode.unauthorized: throw new InvalidCredentialsError()
      default: throw new UnexpectedError()
    }
  }
}
import { AuthenticationParams } from '@usecases/Authentication';
import { ApiPostClient } from '@datasource/ApiPostClient';
import { ApiStatusCode } from '@datasource/api/ApiResopnse';
import { InvalidCredencialsError } from '@repositories/errors/InvalidCredencialsError';
import { UnexpectedError } from '@repositories/errors/UnexpectedError';

export class RemoteAuthentication {
  constructor(
    private readonly url: string,
    private readonly api: ApiPostClient
  ) { };
  async auth(params: AuthenticationParams): Promise<void>{
    const apiResponse = await this.api.post({
      url: this.url,
      body: params
    })
    switch (apiResponse.statusCode) {
      case ApiStatusCode.ok: break
      case ApiStatusCode.unauthorized: throw new InvalidCredencialsError()
      default: throw new UnexpectedError()
    }
  }
}
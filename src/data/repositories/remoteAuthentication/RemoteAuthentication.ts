import { AuthenticationParams } from '@usecases/Authentication';
import { ApiPostClient } from '@datasource/ApiPostClient';

export class RemoteAuthentication {
  constructor(
    private readonly url: string,
    private readonly api: ApiPostClient
  ) { };
  async auth(params: AuthenticationParams): Promise<void>{
    await this.api.post({
      url: this.url,
      body: params
    })
  }
}
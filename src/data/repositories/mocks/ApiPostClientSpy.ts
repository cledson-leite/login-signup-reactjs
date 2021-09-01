import { ApiPostClient, ApiPostClientParams } from '@datasource/ApiPostClient';
import { AuthenticationParams } from '@usecases/Authentication';

export class ApiPostClientSpy implements ApiPostClient {
  public url?: string;
  public body?: AuthenticationParams
  async post(params: ApiPostClientParams): Promise<void> {
    this.url = params.url
    this.body = params.body
    return Promise.resolve();
  }
}
import { ApiResponse, ApiStatusCode } from '@datasource/api/ApiResopnse';
import { ApiPostClient, ApiPostClientParams } from '@datasource/ApiPostClient';
import { AuthenticationParams } from '@usecases/Authentication';

export class ApiPostClientSpy implements ApiPostClient {
  public url?: string
  public body?: AuthenticationParams
  public response: ApiResponse = {
    statusCode: ApiStatusCode.ok
  }

  async post(params: ApiPostClientParams): Promise<ApiResponse> {
    this.url = params.url
    this.body = params.body
    return Promise.resolve(this.response);
  }
}
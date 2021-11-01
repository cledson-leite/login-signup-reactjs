import { ApiResponse, ApiStatusCode } from '@datasource/api/ApiResponse'
import { ApiPostClient, ApiPostClientParams } from '@datasource/ApiPostClient'

export class ApiPostClientSpy<BodyType, ResponseType> implements ApiPostClient<BodyType, ResponseType> {
  public url?: string
  public body?: BodyType
  public response: ApiResponse<ResponseType> = {
    statusCode: ApiStatusCode.ok
  }

  async post (params: ApiPostClientParams<BodyType>): Promise<ApiResponse<ResponseType>> {
    this.url = params.url
    this.body = params.body
    return Promise.resolve(this.response)
  }
}

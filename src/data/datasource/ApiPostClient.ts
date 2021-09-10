import { ApiResponse } from './api/ApiResponse';

export type ApiPostClientParams<BodyType> = {
  url: string,
  body: BodyType
}
export interface ApiPostClient<BodyType, ResponseType> {
  post(params: ApiPostClientParams<BodyType>): Promise<ApiResponse<ResponseType>>
}
import { AuthenticationParams } from '@usecases/Authentication';
import { ApiResponse } from './api/ApiResopnse';

export type ApiPostClientParams = {
  url: string,
  body: AuthenticationParams
}
export interface ApiPostClient {
  post(params: ApiPostClientParams):Promise<ApiResponse>
}
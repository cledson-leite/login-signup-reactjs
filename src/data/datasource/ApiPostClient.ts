import { AuthenticationParams } from '@usecases/Authentication';

export type ApiPostClientParams = {
  url: string,
  body: AuthenticationParams
}
export interface ApiPostClient {
  post(params: ApiPostClientParams):Promise<void>
}
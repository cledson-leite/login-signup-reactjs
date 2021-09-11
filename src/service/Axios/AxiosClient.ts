import axios from 'axios'

import { ApiPostClientParams } from '@datasource/ApiPostClient';

export class AxiosClient {
  async post(params: ApiPostClientParams<any>): Promise<void>{
    await axios(params.url)
  }
}
import axios from 'axios'

import { ApiPostClientParams, ApiPostClient } from '@datasource/ApiPostClient';
import { ApiResponse } from '@datasource/api/ApiResponse';

export class AxiosClient implements ApiPostClient<any, any>{
  async post(params: ApiPostClientParams<any>): Promise<ApiResponse<any>>{
    const response = await axios.post(params.url, params.body)
    return {
      statusCode: response.status,
      body: response.data
    }
  }
}
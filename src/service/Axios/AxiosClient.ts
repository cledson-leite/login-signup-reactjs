import axios, { AxiosResponse } from 'axios'

import { ApiPostClientParams, ApiPostClient } from '@datasource/ApiPostClient'
import { ApiResponse } from '@datasource/api/ApiResponse'

export class AxiosClient implements ApiPostClient<any, any> {
  async post (params: ApiPostClientParams<any>): Promise<ApiResponse<any>> {
    let axiosResponse: AxiosResponse<any>
    try {
      axiosResponse = await axios.post(params.url, params.body)
    } catch (error: any) {
      axiosResponse = error.response
    }
    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data
    }
  }
}

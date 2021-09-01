import { ApiPostClient } from '@datasource/ApiPostClient';

export class RemoteAuthentication {
  constructor(
    private readonly url: string,
    private readonly api: ApiPostClient
  ) { };
  async auth(): Promise<void>{
    await this.api.post(this.url)
  }
}
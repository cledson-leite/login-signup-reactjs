import { ApiPostClient } from '@datasource/ApiPostClient';

export class ApiPostClientSpy implements ApiPostClient {
  public url?: string;
  async post(url: string): Promise<void> {
    this.url = url
    return Promise.resolve();
  }
}
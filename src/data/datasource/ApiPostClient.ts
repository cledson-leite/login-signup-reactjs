export interface ApiPostClient {
  post(url: string):Promise<void>
}
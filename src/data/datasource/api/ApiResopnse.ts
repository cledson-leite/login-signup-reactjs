export enum ApiStatusCode {
  ok = 200,
  BadRequest = 400,
  unauthorized = 401,
  notFound = 404,
  serverError = 500
}

export type ApiResponse = {
  statusCode: ApiStatusCode,
  body?: any
}
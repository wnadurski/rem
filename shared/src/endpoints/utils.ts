import { AuthEndpoints } from "./auth-endpoints"

export interface Response {
  200?: any
  403?: any
}

export type Method = "POST" | "GET"

export interface Endpoint<
  Path extends string,
  M extends Method,
  Request,
  Resp extends Response
> {
  path: Path
  method: M
  request: Request
  response: Resp
}

export type EndpointsList<Keys extends string> = {
  [K in Keys]: Endpoint<any, any, any, any>
}

export type PrependPath<
  Path extends string,
  T extends EndpointsList<string>
> = {
  [K in keyof T]: Omit<T[K], "path"> & {
    path: `${Path}${T[K]["path"]}`
  }
}

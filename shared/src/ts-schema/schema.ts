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
  __tag: "Endpoint"
  value: {
    path: Path
    method: M
    request: Request
    response: Resp
  }
}

export type AnyEndpoint = Endpoint<any, any, any, any>

export type SchemaWithPrefix<
  Prefix extends string,
  S extends { [K in keyof S]: AnyEndpoint | SchemaWithPrefix<string, any> }
> = {
  __tag: "Schema"
  value: PrependPrefix<Prefix, S>
}

export type Schema<
  S extends { [K in keyof S]: AnyEndpoint | SchemaWithPrefix<string, any> }
> = SchemaWithPrefix<"", S>

type PrependPrefix<
  Prefix extends string,
  S extends { [K in keyof S]: AnyEndpoint | SchemaWithPrefix<string, any> }
> = {
  [K in keyof S]: S[K] extends Endpoint<
    infer Path,
    infer Method,
    infer Request,
    infer Response
  >
    ? Endpoint<`${Prefix}${Path}`, Method, Request, Response>
    : S[K] extends SchemaWithPrefix<infer NextPrefix, infer S>
    ? SchemaWithPrefix<`${Prefix}${NextPrefix}`, S>
    : never
}

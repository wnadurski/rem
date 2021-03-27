import { AnyEndpoint, SchemaWithPrefix } from "./schema"

type ReturnType<A, Keys extends keyof A = keyof A> = Keys extends any
  ? { code: Keys; data: A[Keys] }
  : never

export type EndpointToProvider<
  E extends AnyEndpoint,
  EV extends E["value"] = E["value"]
> = {
  path: EV["path"]
  method: EV["method"]
  handler: (
    body: Partial<EV["request"]>,
    request: any
  ) => Promise<ReturnType<EV["response"]>>
}

export type SchemaToProviders<
  S extends SchemaWithPrefix<string, any>,
  SV extends S["value"] = S["value"]
> = {
  [K in keyof SV]: SV[K] extends SchemaWithPrefix<string, any>
    ? SchemaToProviders<SV[K]>
    : SV[K] extends AnyEndpoint
    ? EndpointToProvider<SV[K]>
    : never
}

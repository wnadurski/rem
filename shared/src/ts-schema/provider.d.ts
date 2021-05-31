import { AnyEndpoint, SchemaWithPrefix } from "./schema"
import { ResponseType } from "./_response-type"

export type EndpointToProvider<
  E extends AnyEndpoint,
  EV extends E["value"] = E["value"]
> = {
  path: EV["path"]
  method: EV["method"]
  handler: (
    body: Partial<EV["request"]>,
    request: any
  ) => Promise<ResponseType<EV["response"]>>
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

export type HandlerFor<
  P extends SchemaToProviders<any>,
  Key extends keyof P
> = P[Key]["handler"]

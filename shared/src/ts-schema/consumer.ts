import { Endpoint, Schema, SchemaWithPrefix } from "./schema"
import { MySchema } from "./__tests__/schema.test"
import { ResponseType } from "./_response-type"

type ConsumerFunction<
  Path,
  Method,
  Request,
  Response
> = Request extends undefined
  ? (meta: { path: Path; method: Method }) => Promise<ResponseType<Response>>
  : (
      meta: { path: Path; method: Method },
      params: Request
    ) => Promise<ResponseType<Response>>

export type SchemaConsumer<
  S extends SchemaWithPrefix<string, any>,
  SV extends S["value"] = S["value"]
> = {
  [K in keyof SV]: SV[K] extends Schema<any>
    ? SchemaConsumer<SV[K]>
    : SV[K] extends Endpoint<
        infer Path,
        infer Method,
        infer Request,
        infer Response
      >
    ? ConsumerFunction<Path, Method, Request, Response>
    : never
}

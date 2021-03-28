import { expectError, expectType } from "tsd"
import { MySchema } from "../__tests__/schema.test"
import { SchemaToProviders } from "../provider"

export type MyProvider = SchemaToProviders<MySchema>
export declare const providers: MyProvider

expectType<{
  path: "/users"
  method: "GET"
  handler: (
    body: undefined,
    request: any
  ) => Promise<{ code: 200; data: { users: any[] } }>
}>(providers.users.getUsers)

expectType<"/users">(providers.users.createUser.path)
expectType<"POST">(providers.users.createUser.method)

expectType<
  Promise<{ code: 200; data: undefined } | { code: 400; data: { error: any } }>
>(providers.users.createUser.handler({ name: "asd" }, {}))

expectError(providers.users.createUser.handler({ different: "asd" }, {}))

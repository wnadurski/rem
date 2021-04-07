import { expectError, expectType } from "tsd"
import { SchemaConsumer } from "../consumer"
import { MySchema } from "../__tests__/schema.test"

export type MyConsumer = SchemaConsumer<MySchema>
export declare const services: MyConsumer

expectType<Promise<{ code: 200; data: { users: any[] } }>>(
  services.users.getUsers({ path: "/users", method: "GET" })
)

expectError(services.users.getUsers({ path: "test", method: "GET" }))
expectError(services.users.getUsers({ path: "/users", method: "POST" }))
expectError(services.users.getUsers({ path: "/users", method: "ASD" }))

expectType<
  Promise<{ code: 200; data: undefined } | { code: 400; data: { error: any } }>
>(
  services.users.createUser(
    { path: "/users", method: "POST" },
    { name: "user" }
  )
)

expectError(services.users.createUser({ path: "/users", method: "POST" }))
expectError(
  services.users.createUser({ path: "/users", method: "POST" }, { name: 12 })
)
expectError(
  services.users.createUser(
    { path: "/users", method: "POST" },
    { differnet: "" }
  )
)

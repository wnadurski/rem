import { SchemaToProviders } from "../provider"
import { MySchema, MySchemaWithPrefixes } from "./schema.test"

type MyHandlers = SchemaToProviders<MySchema>

const handlers: MyHandlers = {
  users: {
    getUsers: {
      path: "/users",
      method: "GET",
      handler: () =>
        Promise.resolve({
          code: 200,
          data: { users: [] },
        }),
    },
    createUser: {
      path: "/users",
      method: "POST",
      handler: () => Promise.resolve({ code: 200, data: undefined }),
    },
  },
}

type MyHandlersWithPrefixes = SchemaToProviders<MySchemaWithPrefixes>

const handlersWithPrefixes: MyHandlersWithPrefixes = {
  users: {
    getDetails: {
      path: "/api/users/:id",
      method: "GET",
      handler: () =>
        Promise.resolve({
          code: 200,
          data: { users: [] },
        }),
    },
    getUsers: {
      path: "/api/users",
      method: "GET",
      handler: () =>
        Promise.resolve({
          code: 200,
          data: { users: [] },
        }),
    },
    createUser: {
      path: "/api/users",
      method: "POST",
      handler: () => Promise.resolve({ code: 200, data: undefined }),
    },
  },
}

it("should work", () => {
  expect(true).toBe(true)
})

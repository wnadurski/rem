import { Endpoint, Schema, SchemaWithPrefix } from "../schema"

export type MySchema = Schema<{
  users: Schema<{
    getUsers: Endpoint<"/users", "GET", any, { 200: { users: any[] } }>
    createUser: Endpoint<
      "/users",
      "POST",
      { name: string },
      { 200: undefined; 400: { error: any } }
    >
  }>
}>

const schema: MySchema = {
  __tag: "Schema",
  value: {
    users: {
      __tag: "Schema",
      value: {
        getUsers: {
          __tag: "Endpoint",
          value: {
            path: "/users",
            method: "GET",
            request: { name: "asd" },
            response: {
              200: { users: [] },
            },
          },
        },
        createUser: {
          __tag: "Endpoint",
          value: {
            path: "/users",
            method: "POST",
            request: { name: "asd" },
            response: {
              200: undefined,
              400: { error: "anything" },
            },
          },
        },
      },
    },
  },
}

/* Test schema with prefix */

export type MySchemaWithPrefixes = SchemaWithPrefix<
  "/api",
  {
    users: SchemaWithPrefix<
      "/users",
      {
        getUsers: Endpoint<"", "GET", any, { 200: { users: any[] } }>
        createUser: Endpoint<
          "",
          "POST",
          { name: string },
          { 200: undefined; 400: { error: any } }
        >
        getDetails: Endpoint<"/:id", "GET", any, { 200: any }>
      }
    >
  }
>

const schemaWithPrefixes: MySchemaWithPrefixes = {
  __tag: "Schema",
  value: {
    users: {
      __tag: "Schema",
      value: {
        getDetails: {
          __tag: "Endpoint",
          value: {
            path: "/api/users/:id",
            method: "GET",
            request: { name: "asd" },
            response: {
              200: {},
            },
          },
        },
        getUsers: {
          __tag: "Endpoint",
          value: {
            path: "/api/users",
            method: "GET",
            request: { name: "asd" },
            response: {
              200: { users: [] },
            },
          },
        },
        createUser: {
          __tag: "Endpoint",
          value: {
            path: "/api/users",
            method: "POST",
            request: { name: "asd" },
            response: {
              200: undefined,
              400: { error: "anything" },
            },
          },
        },
      },
    },
  },
}

it("should work", () => {
  expect(true).toBe(true)
})

import { MySchema } from "./schema.test"
import { SchemaConsumer } from "../consumer"

type MyConsumer = SchemaConsumer<MySchema>

const services: MyConsumer = {
  users: {
    getUsers: ({ path, method }) =>
      fetch(path, { method }).then((r) => r.json()),
    createUser: ({ path, method }, { name }) =>
      fetch(path, { method, body: JSON.stringify({ name }) }).then((r) =>
        r.json()
      ),
  },
}

function testing() {
  services.users.createUser({ path: "/users", method: "POST" }, { name: "asd" })
  services.users.getUsers({ path: "/users", method: "GET" })
}

it("dummy", () => {
  expect(true).toBe(true)
})

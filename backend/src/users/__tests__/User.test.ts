import { createUser } from "../User"
import { v4 } from "uuid"
import { passwordToStore } from "../crypto"

jest.mock("uuid")
jest.mock("../crypto")

const v4Mock = v4 as jest.Mock
const passwordToStoreMock = passwordToStore as jest.Mock

v4Mock.mockReturnValue("FAKE UUID")

const email = "someemail@test.pl"

it("should create new user", () => {
  const user = createUser(email)

  expect(user).toEqual({
    id: "FAKE UUID",
    email,
    password: undefined,
  })
})

it("should hash user's password", () => {
  const somePassword = "some password"
  passwordToStoreMock.mockReturnValue("something hashed")

  const user = createUser(email, somePassword)

  expect(passwordToStore).toBeCalledWith(somePassword)
  expect(user).toEqual({
    id: "FAKE UUID",
    email,
    password: "something hashed",
  })
})

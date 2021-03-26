import { v4 } from "uuid"
import { passwordToStore } from "../crypto"
import { createUserApi } from "../UserApi"
import { UserPersistence } from "../UserPersistence"

jest.mock("uuid")
jest.mock("../crypto")

const v4Mock = v4 as jest.Mock
const passwordToStoreMock = passwordToStore as jest.Mock

beforeEach(() => {
  v4Mock.mockReturnValue("FAKE UUID")
})

const email = "someemail@test.pl"

const mockedUserPersistence: UserPersistence = {
  saveUser: jest.fn().mockResolvedValue(undefined),
}
const userApi = createUserApi(mockedUserPersistence)

it("should create new user", async () => {
  v4Mock.mockReturnValue("FAKE UUID")

  const user = await userApi.createUser(email)

  expect(user).toEqual({
    id: "FAKE UUID",
    email,
    password: undefined,
  })
})

it("should hash user's password", async () => {
  const somePassword = "some password"
  passwordToStoreMock.mockReturnValue("something hashed")

  const user = await userApi.createUser(email, somePassword)

  expect(passwordToStore).toBeCalledWith(somePassword)
  expect(user).toEqual({
    id: "FAKE UUID",
    email,
    password: "something hashed",
  })
})

it("calls persistence layer", async () => {
  const user = await userApi.createUser(email)

  expect(mockedUserPersistence.saveUser).toBeCalledWith(user)
})

import { v4 } from "uuid"
import jwt from "jsonwebtoken"
import { isPasswordMatch, passwordToStore } from "../crypto"
import { createUserApi } from "../UserApi"
import { UserPersistence } from "../UserPersistence"
import { map, none, some } from "fp-ts/Option"
import { MockFunctions } from "../../../test-utils"
import { pipe } from "fp-ts/lib/function"

jest.mock("uuid")
jest.mock("../crypto")

const v4Mock = v4 as jest.Mock
const passwordToStoreMock = passwordToStore as jest.Mock
const isPasswordMatchMock = isPasswordMatch as jest.Mock

const email = "someemail@test.pl"

const mockedUserPersistence: MockFunctions<UserPersistence> = {
  saveUser: jest.fn(),
  getByEmail: jest.fn(),
  getById: jest.fn(),
}
const userApi = createUserApi(mockedUserPersistence)

beforeEach(() => {
  v4Mock.mockReturnValue("FAKE UUID")
  mockedUserPersistence.saveUser.mockResolvedValue(undefined)
  mockedUserPersistence.getByEmail.mockResolvedValue(
    some({
      id: "someId",
      email: email,
      password: "some password",
    })
  )
})

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

it("returns none when password doesnt match", async () => {
  isPasswordMatchMock.mockReturnValueOnce(false)
  const token = await userApi.authenticateUser(email, "asd")

  expect(token).toEqual(none)
})

it("returns token when password matches", async () => {
  isPasswordMatchMock.mockReturnValueOnce(true)
  const token = await userApi.authenticateUser(email, "asd")

  expect(
    pipe(
      token,
      map((token) => jwt.decode(token))
    )
  ).toEqual(some(expect.objectContaining({ id: "someId" })))
})

it("returns none when user doesn't have a password", async () => {
  mockedUserPersistence.getByEmail.mockReturnValueOnce(
    some({
      id: "some other id",
      email: "Some email",
      password: null,
    })
  )
  const token = await userApi.authenticateUser(email, "asd")

  expect(token).toEqual(none)
})

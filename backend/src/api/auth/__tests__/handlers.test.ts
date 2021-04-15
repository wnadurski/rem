import { authHandlers } from "../handlers"
import { UserApi } from "../../../core/users/UserApi"
import { none, some } from "fp-ts/Option"

const mockedUserApi: jest.Mocked<UserApi> = {
  authenticateUser: jest.fn(),
  createUser: jest.fn(),
  getUserForToken: jest.fn(),
}

const handlers = authHandlers(mockedUserApi)

describe("sign in", () => {
  it("should return token for successful log in", async () => {
    mockedUserApi.authenticateUser.mockResolvedValueOnce(some("some token"))

    const response = await handlers.signIn.handler(
      { login: "asd", password: "asd2" },
      {}
    )

    expect(response.data?.token).toEqual("some token")
  })

  it("should return undefined for unsuccessful login", async () => {
    mockedUserApi.authenticateUser.mockResolvedValueOnce(none)

    const response = await handlers.signIn.handler(
      { login: "asd", password: "asd2" },
      {}
    )

    expect(response.data?.token).toEqual(undefined)
  })
})

describe("getCurrentUser", () => {
  it("should get user from middleware", async () => {
    const user = { id: "some id", email: "some email" }

    const response = await handlers.getCurrentUser.handler(undefined, { user })

    expect(response).toEqual({ code: 200, data: user })
  })
})

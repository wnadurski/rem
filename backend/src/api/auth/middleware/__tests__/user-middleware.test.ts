import { coreApi } from "../../../../core-api"
import { userMiddleware } from "../user"
import { resolvePromiseWhenInvoked } from "../../../../test-utils"
import { some } from "fp-ts/Option"

jest.mock("../../../../core-api", () => ({
  coreApi: {
    user: {
      getUserForToken: jest.fn(),
    },
  },
}))

const getUserForTokenMock = coreApi.user.getUserForToken as jest.Mock

it("should call coreApi.user.getUserForToken and mutate request", async () => {
  const token = "some.token"
  const request: any = {
    header: () => `Bearer ${token}`,
  }
  const user = { id: "some id" }
  const internalNext = jest.fn()
  const [nextIsCalled, next] = resolvePromiseWhenInvoked(internalNext)

  getUserForTokenMock.mockResolvedValue(some(user))

  userMiddleware(request, {} as any, next)

  await nextIsCalled

  expect(getUserForTokenMock).toBeCalledWith(token)
  expect(internalNext).toBeCalled()
  expect(request.user).toBe(user)
})

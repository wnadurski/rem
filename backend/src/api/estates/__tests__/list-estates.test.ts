import { listEstates } from "../list-estates"
import { User } from "../../../core/users/User"
import { setUser } from "../../auth/middleware/user"
import { Request } from "express"
import * as T from "fp-ts/Task"

const getEstatesForUser = jest.fn()
const listEstatesApi = listEstates(getEstatesForUser)

const user: User = {
  id: "some id",
} as any

const request: Request = {} as any

setUser(request, user)

it("should call core api for estates", async () => {
  const estates: any = ["some estate"]
  getEstatesForUser.mockReturnValue(T.of(estates))

  const result = await listEstatesApi(undefined, request)

  expect(getEstatesForUser).toBeCalledWith(user.id)
  expect(result).toEqual({ code: 200, data: { estates } })
})

it("should return 403 if there is no user", async () => {
  const result = await listEstatesApi(undefined, {})

  expect(result).toEqual({ code: 403, data: undefined })
})

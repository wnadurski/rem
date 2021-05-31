import { User } from "../../core/users/User"
import { Request } from "express"
import { getUser } from "../auth/middleware/user"

export const withUserOr403 = <Data, Response>(
  handler: (data: Data, request: Request, user: User) => Promise<Response>
): ((
  data: Data,
  request: Request
) => Promise<Response | { code: 403; data: undefined }>) => (data, request) => {
  const user = getUser(request)

  if (!user) {
    return Promise.resolve({ code: 403, data: undefined })
  }

  return handler(data, request, user)
}

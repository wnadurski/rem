import { constant, pipe } from "fp-ts/lib/function"
import { coreApi } from "../../core-api"
import { EndpointsHandlers } from "../EndpointsHandlers"
import { matchW } from "fp-ts/Option"

export const authHandlers: EndpointsHandlers["auth"] = {
  signIn: {
    path: "/auth/login",
    method: "POST",
    handler: async ({ login, password }) => {
      if (!login || !password) {
        return { code: 403, data: undefined }
      }

      const token = await coreApi.user.authenticateUser(login, password)

      return pipe(
        token,
        matchW(constant({ code: 403, data: undefined }), (token) => ({
          code: 200,
          data: { token },
        }))
      )
    },
  },
}

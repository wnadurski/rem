import { constant, pipe } from "fp-ts/lib/function"
import { matchW } from "fp-ts/Option"
import { SchemaToProviders } from "../../../../shared/src/ts-schema/provider"
import {
  AuthSchema,
  UserView,
} from "../../../../shared/src/api-schema/auth-schema"
import { UserApi } from "../../core/users/UserApi"
import { Request } from "express"
import { getUser } from "./middleware/user"
import { showId } from "../../core/id/Id"

export const authHandlers: (
  userApi: UserApi
) => SchemaToProviders<AuthSchema> = (userApi) => ({
  signIn: {
    path: "/auth/login",
    method: "POST",
    handler: async ({ login, password }) => {
      if (!login || !password) {
        return { code: 403, data: undefined }
      }

      const token = await userApi.authenticateUser(login, password)

      return pipe(
        token,
        matchW(constant({ code: 403, data: undefined }), (token) => ({
          code: 200,
          data: { token },
        }))
      )
    },
  },
  signOut: {
    path: "/auth/logout",
    method: "DELETE",
    handler: async () => {
      return { code: 200, data: undefined }
    },
  },
  getCurrentUser: {
    path: "/auth/me",
    method: "GET",
    handler: async (body, request: Request) => {
      const user = getUser(request)

      if (!user) {
        return { code: 403, data: undefined }
      }

      const view: UserView = {
        ...user,
        id: showId.show(user.id),
      }

      return { code: 200, data: view }
    },
  },
})

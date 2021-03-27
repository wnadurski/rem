import { constant, pipe } from "fp-ts/lib/function"
import { coreApi } from "../../core-api"
import { matchW } from "fp-ts/Option"
import { SchemaToProviders } from "../../../../shared/src/ts-schema/provider"
import { AuthSchema } from "../../../../shared/src/api-schema/auth-schema"

export const authHandlers: SchemaToProviders<AuthSchema> = {
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

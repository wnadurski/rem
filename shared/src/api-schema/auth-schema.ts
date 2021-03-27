import { Endpoint, Schema } from "../ts-schema/schema"

export type AuthSchema = Schema<{
  signIn: Endpoint<
    "/auth/login",
    "POST",
    {
      login: string
      password: string
    },
    {
      200: {
        token: string
      }
      403: undefined
    }
  >
}>

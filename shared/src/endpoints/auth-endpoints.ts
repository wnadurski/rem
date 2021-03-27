import { Endpoint } from "./utils"

export interface AuthEndpoints {
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
}

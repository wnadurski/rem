import { Endpoint, Schema } from "../ts-schema/schema"

export interface UserView {
  id: string
  email: string
}

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
  signOut: Endpoint<
    "/auth/logout",
    "DELETE",
    undefined,
    {
      200: undefined
    }
  >
  getCurrentUser: Endpoint<
    "/auth/me",
    "GET",
    undefined,
    {
      200: UserView
      403: undefined
    }
  >
}>

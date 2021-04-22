import { Id, parseId } from "../id/Id"
import { Password } from "./Password"
import { map, none, Option } from "fp-ts/Option"
import { pipe } from "fp-ts/function"

export interface User {
  id: Id
  email: string
  password?: Password | null
}

export interface TokenPayload extends Omit<User, "password"> {}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const objToTokenPayload = (o: any): Option<TokenPayload> => {
  if (
    !o?.id ||
    !o?.email ||
    typeof o.id !== "string" ||
    typeof o.email !== "string"
  ) {
    return none
  }

  return pipe(
    o.id,
    parseId.parse,
    map((id) => ({ id, email: o.email }))
  )
}

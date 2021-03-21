import { createId, Id } from "../id/Id"
import { Password, passwordToStore } from "./crypto"

export interface User {
  id: Id
  email: string
  password?: Password
}

export const createUser = (email: string, password?: string): User => {
  return {
    id: createId(),
    email,
    password: password ? passwordToStore(password) : undefined,
  }
}

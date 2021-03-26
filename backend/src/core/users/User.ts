import { Id } from "../id/Id"
import { Password } from "./Password"

export interface User {
  id: Id
  email: string
  password?: Password
}

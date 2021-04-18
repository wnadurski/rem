import { User } from "./User"
import { Option } from "fp-ts/Option"
import { Id } from "../id/Id"
import { Task } from "fp-ts/Task"

export interface UserPersistence {
  saveUser: (user: User) => Promise<void>
  getByEmail: (email: string) => Promise<Option<User>>
  getById: (id: Id) => Promise<Option<User>>
  saveToken: (token: string) => Task<void>
  deleteToken: (token: string) => Task<void>
  isTokenWhitelisted: (token: string) => Task<boolean>
}

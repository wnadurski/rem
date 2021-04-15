import { User } from "./User"
import { Option } from "fp-ts/Option"
import { Id } from "../id/Id"

export interface UserPersistence {
  saveUser: (user: User) => Promise<void>
  getByEmail: (email: string) => Promise<Option<User>>
  getById: (id: Id) => Promise<Option<User>>
}

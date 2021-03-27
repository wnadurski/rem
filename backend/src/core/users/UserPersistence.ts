import { User } from "./User"
import { Option } from "fp-ts/Option"

export interface UserPersistence {
  saveUser: (user: User) => Promise<void>
  getByEmail: (email: string) => Promise<Option<User>>
}

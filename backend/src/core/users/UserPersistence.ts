import { User } from "./User"

export interface UserPersistence {
  saveUser: (user: User) => Promise<void>
}

import { createId } from "../id/Id"
import { passwordToStore } from "./crypto"
import { User } from "./User"
import { UserPersistence } from "./UserPersistence"

export interface UserApi {
  createUser: (email: string, password?: string) => Promise<User>
}

export const createUserApi = (persistence: UserPersistence): UserApi => {
  return {
    async createUser(email, password?) {
      const user = {
        id: createId(),
        email,
        password: password ? passwordToStore(password) : undefined,
      }

      await persistence.saveUser(user)

      return user
    },
  }
}

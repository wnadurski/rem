import { createId } from "../id/Id"
import { isPasswordMatch, passwordToStore } from "./crypto"
import { User } from "./User"
import { UserPersistence } from "./UserPersistence"
import { filter, map, Option } from "fp-ts/Option"
import { pipe } from "fp-ts/function"
import jwt from "jsonwebtoken"
import { config } from "../../config"
import { log } from "../../log"

export interface UserApi {
  createUser: (email: string, password?: string) => Promise<User>
  authenticateUser: (email: string, password: string) => Promise<Option<string>>
}

export const createUserApi = (persistence: UserPersistence): UserApi => {
  return {
    async authenticateUser(email, password) {
      log("Authenticating user:", email)
      return pipe(
        await persistence.getByEmail(email),
        filter((user) => {
          const isMatch =
            !!user.password && isPasswordMatch(password, user.password)

          log(isMatch ? "Password match" : "Password doesn't match")

          return isMatch
        }),
        map((user) => user.id),
        map((id) => jwt.sign({ id }, config.authSecret))
      )
    },

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

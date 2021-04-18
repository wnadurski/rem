import { createId } from "../id/Id"
import { isPasswordMatch, passwordToStore } from "./crypto"
import { objToTokenPayload, TokenPayload, User } from "./User"
import { UserPersistence } from "./UserPersistence"
import { filter, map, none, Option } from "fp-ts/Option"
import { pipe } from "fp-ts/function"
import jwt from "jsonwebtoken"
import { config } from "../../config"
import { log } from "../../log"
import { omit } from "ramda"
import { optionPromise } from "../../utils/promise"
import { Task } from "fp-ts/Task"

export interface UserApi {
  createUser: (email: string, password?: string) => Promise<User>
  authenticateUser: (email: string, password: string) => Promise<Option<string>>
  getUserForToken: (token: string) => Promise<Option<User>>
  logoutUser: (token: string) => Task<void>
}

export const createUserApi = (persistence: UserPersistence): UserApi => {
  return {
    logoutUser: (token) => pipe(token, persistence.deleteToken),
    async getUserForToken(token: string) {
      if (!(await persistence.isTokenWhitelisted(token)())) {
        return none
      }

      try {
        const payload: any = jwt.verify(token, config.authSecret)

        return objToTokenPayload(payload)
      } catch (e) {
        return none
      }
    },
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
        map((user) => omit(["password"], user) as TokenPayload),
        map((payload) => jwt.sign(payload, config.authSecret)),
        map((token) =>
          persistence
            .saveToken(token)()
            .then(() => token)
        ),
        optionPromise
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

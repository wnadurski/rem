import { UserPersistence } from "../../../core/users/UserPersistence"
import { prisma } from "../client"
import { Id, parseId, showId } from "../../../core/id/Id"
import {
  mkPassword,
  Password,
  showPassword,
} from "../../../core/users/Password"
import { chain, fromNullable, map, option, Option, some } from "fp-ts/Option"
import { pipe } from "fp-ts/function"
import { User } from "../../../core/users/User"
import { User as DbUser } from "@prisma/client"
import { sequenceT } from "fp-ts/Apply"
import { Task } from "fp-ts/Task"

const userFromDb: (user: DbUser) => Option<User> = (user) =>
  pipe(
    sequenceT(option)(
      parseId.parse(user.id),
      user.password ? mkPassword(user.password) : some(null)
    ),
    map(([id, password]: [Id, Password | null]) => ({ ...user, id, password }))
  )

export const userPersistence: UserPersistence = {
  isTokenWhitelisted: (token) => async () =>
    !!(await prisma.whitelistedTokens.findFirst({ where: { token } })),
  deleteToken(token: string): Task<void> {
    return async () => {
      await prisma.whitelistedTokens.delete({ where: { token } })
    }
  },
  saveToken(token: string): Task<void> {
    return async () => {
      await prisma.whitelistedTokens.create({
        data: { token },
      })
    }
  },
  async getByEmail(email) {
    return pipe(
      await prisma.user.findFirst({ where: { email } }),
      fromNullable,
      chain(userFromDb)
    )
  },

  async getById(id) {
    return pipe(
      await prisma.user.findFirst({ where: { id: showId.show(id) } }),
      fromNullable,
      chain(userFromDb)
    )
  },

  async saveUser(user) {
    await prisma.user.create({
      data: {
        ...user,
        id: showId.show(user.id),
        password: user.password && showPassword.show(user.password),
      },
    })
  },
}

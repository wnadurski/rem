import { UserPersistence } from "../../../core/users/UserPersistence"
import { prisma } from "../client"
import { Id, parseId, showId } from "../../../core/id/Id"
import {
  mkPassword,
  parsePassword,
  Password,
  showPassword,
} from "../../../core/users/Password"
import {
  chain,
  fromNullable,
  map,
  option,
  Option,
  sequence,
  some,
} from "fp-ts/Option"
import { pipe } from "fp-ts/function"
import { User } from "../../../core/users/User"
import { User as DbUser } from "@prisma/client"
import { sequenceT } from "fp-ts/Apply"

const userFromDb: (user: DbUser) => Option<User> = (user) =>
  pipe(
    sequenceT(option)(
      parseId.parse(user.id),
      user.password ? mkPassword(user.password) : some(null)
    ),
    map(([id, password]: [Id, Password | null]) => ({ ...user, id, password }))
  )

export const userPersistence: UserPersistence = {
  async getByEmail(email) {
    return pipe(
      await prisma.user.findFirst({ where: { email } }),
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

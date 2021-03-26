import { UserPersistence } from "../../../core/users/UserPersistence"
import { prisma } from "../client"
import { showId } from "../../../core/id/Id"
import { showPassword } from "../../../core/users/Password"

export const userPersistence: UserPersistence = {
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

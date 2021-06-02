import { createCoreApi } from "./core"
import { userPersistence } from "./persistence/prisma/users/user-persistence"
import { estatesPersistence } from "./persistence/prisma/estates/estates-persistence"

export const coreApi = createCoreApi({
  user: userPersistence,
  estates: estatesPersistence,
})

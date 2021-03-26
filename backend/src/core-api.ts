import { createCoreApi } from "./core"
import { userPersistence } from "./persistence/prisma/users/user-persistence"

export const coreApi = createCoreApi({ user: userPersistence })

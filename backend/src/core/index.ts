import { createUserApi, UserApi } from "./users/UserApi"
import { UserPersistence } from "./users/UserPersistence"

interface CoreApiPersistence {
  user: UserPersistence
}

interface CoreApi {
  user: UserApi
}

export const createCoreApi = (persistence: CoreApiPersistence): CoreApi => ({
  user: createUserApi(persistence.user),
})

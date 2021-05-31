import { createUserApi, UserApi } from "./users/UserApi"
import { UserPersistence } from "./users/UserPersistence"
import { EstatesPersistence } from "./estates/EstatesPersistence"
import { GetEstatesForUser, mkGetEstatesForUser } from "./estates/EstatesApi"

interface CoreApiPersistence {
  user: UserPersistence
  estates: EstatesPersistence
}

interface CoreApi {
  user: UserApi
  estates: {
    getEstatesForUser: GetEstatesForUser
  }
}

export const createCoreApi = (persistence: CoreApiPersistence): CoreApi => ({
  user: createUserApi(persistence.user),
  estates: {
    getEstatesForUser: mkGetEstatesForUser(
      persistence.estates.getEstatesForUser
    ),
  },
})

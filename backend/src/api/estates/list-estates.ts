import { HandlerFor } from "../../../../shared/src/ts-schema/provider"
import { EstatesProviders } from "./providers"
import { GetEstatesForUser } from "../../core/estates/EstatesApi"
import { withUserOr403 } from "../decorators/withUserOr403"

export const listEstates = (
  getEstatesForUser: GetEstatesForUser
): HandlerFor<EstatesProviders, "listEstates"> =>
  withUserOr403(async (data, request, user) => {
    return {
      data: { estates: [...(await getEstatesForUser(user.id)())] },
      code: 200,
    }
  })

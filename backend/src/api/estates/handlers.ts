import { EstatesProviders } from "./providers"
import { listEstates } from "./list-estates"
import { coreApi } from "../../core-api"

export const estatesHandlers = (): EstatesProviders => ({
  listEstates: {
    path: "/estates",
    method: "GET",
    handler: listEstates(coreApi.estates.getEstatesForUser),
  },
})

import { authHandlers } from "./auth/handlers"
import { SchemaToProviders } from "../../../shared/src/ts-schema/provider"
import { ApiSchema } from "../../../shared/src/api-schema"
import { coreApi } from "../core-api"
import { estatesHandlers } from "./estates/handlers"

export const endpoints: SchemaToProviders<ApiSchema> = {
  auth: authHandlers(coreApi.user),
  estates: estatesHandlers(),
}

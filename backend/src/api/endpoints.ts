import { authHandlers } from "./auth/handlers"
import { SchemaToProviders } from "../../../shared/src/ts-schema/provider"
import { ApiSchema } from "../../../shared/src/api-schema"

export const endpoints: SchemaToProviders<ApiSchema> = {
  auth: authHandlers,
}

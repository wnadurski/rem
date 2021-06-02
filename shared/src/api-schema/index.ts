import { AuthSchema } from "./auth-schema"
import { Schema } from "../ts-schema/schema"
import { EstatesSchema } from "./estates-schema"

export type ApiSchema = Schema<{
  auth: AuthSchema
  estates: EstatesSchema
}>

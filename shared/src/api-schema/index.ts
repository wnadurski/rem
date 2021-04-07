import { AuthSchema } from "./auth-schema"
import { Schema } from "../ts-schema/schema"

export type ApiSchema = Schema<{
  auth: AuthSchema
}>

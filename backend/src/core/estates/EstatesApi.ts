import { Id } from "../id/Id"
import { Task } from "fp-ts/Task"
import { Estate } from "./Estate"
import { EstatesPersistence } from "./EstatesPersistence"

export type GetEstatesForUser = (id: Id) => Task<readonly Estate[]>

export const mkGetEstatesForUser = (
  getEstatesForUserDb: EstatesPersistence["getEstatesForUser"]
): GetEstatesForUser => getEstatesForUserDb

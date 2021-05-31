import { Id } from "../id/Id"
import { Estate } from "./Estate"
import { Task } from "fp-ts/Task"

export interface EstatesPersistence {
  getEstatesForUser: (id: Id) => Task<readonly Estate[]>
}

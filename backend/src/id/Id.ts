import { v4 } from "uuid"
import { iso, Newtype } from "newtype-ts"

export interface Id extends Newtype<{ readonly Id: unique symbol }, string> {}
const isoId = iso<Id>()

export const createId = (): Id => isoId.wrap(v4())

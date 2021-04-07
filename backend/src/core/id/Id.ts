import { v4 } from "uuid"
import { iso, Newtype } from "newtype-ts"
import { Show } from "fp-ts/Show"
import { Option, some } from "fp-ts/Option"

export interface Id extends Newtype<{ readonly Id: unique symbol }, string> {}
const isoId = iso<Id>()

export const createId = (): Id => {
  return isoId.wrap(v4())
}

export const parseId = {
  parse: (id: string): Option<Id> => some(isoId.wrap(id)),
}

export const showId: Show<Id> = {
  show(id) {
    return isoId.unwrap(id)
  },
}

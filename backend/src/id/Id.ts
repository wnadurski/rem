import { Newtype, wrap } from "../utils/Newtype"
import { v4 } from "uuid"

export interface Id extends Newtype<string> {}

export const createId = (): Id => wrap(v4())

import { iso, Newtype } from "newtype-ts"
import { Values } from "../../../../shared/src/utils/types"
import { Show } from "fp-ts/Show"
import { Option, some } from "fp-ts/Option"

export const algorithms = ["sha256"] as const
export const hashingAlgorithm = "sha256"

export interface Password
  extends Newtype<{ readonly Password: unique symbol }, string> {}

const isoPassword = iso<Password>()

export const mkPassword = (x: string): Option<Password> =>
  some(isoPassword.wrap(x))

export const parsePassword = (
  password: Password
): [Values<typeof algorithms>, string, string] => {
  return isoPassword.unwrap(password).split("$") as any
}

export const showPassword: Show<Password> = {
  show(password) {
    return isoPassword.unwrap(password)
  },
}

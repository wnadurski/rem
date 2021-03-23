import * as crypto from "crypto"
import { Values } from "../../../shared/src/utils/types"
import { config } from "../config"
import { iso, Newtype } from "newtype-ts"

const algorithms = ["sha256"] as const

const hashingAlgorithm = "sha256"

export interface Password
  extends Newtype<{ readonly Password: unique symbol }, string> {}

const isoPassword = iso<Password>()

const mkPassword = (x: string): Password => isoPassword.wrap(x)
const parsePassword = (
  password: Password
): [Values<typeof algorithms>, string, string] => {
  return isoPassword.unwrap(password).split("$") as any
}

const hashPassword = (
  hashingAlgorithm: Values<typeof algorithms>,
  salt: string,
  rawPassword: string
): string =>
  crypto
    .createHmac(hashingAlgorithm, config.secret)
    .update(`${salt}${rawPassword}`)
    .digest("base64")

export const passwordToStore = (password: string): Password => {
  const salt = crypto.randomBytes(32).toString("base64")
  const hashedPassword = hashPassword(hashingAlgorithm, salt, password)

  return mkPassword(`${hashingAlgorithm}$${salt}$${hashedPassword}`)
}

export const isPasswordMatch = (
  rawPassword: string,
  storedPassword: Password
): boolean => {
  const [algorithm, salt, hashedPassword] = parsePassword(storedPassword)

  return hashPassword(algorithm, salt, rawPassword) === hashedPassword
}

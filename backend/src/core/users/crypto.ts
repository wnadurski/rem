import * as crypto from "crypto"
import { Values } from "../../../../shared/src/utils/types"
import { config } from "../../config"
import {
  algorithms,
  hashingAlgorithm,
  mkPassword,
  parsePassword,
  Password,
} from "./Password"

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

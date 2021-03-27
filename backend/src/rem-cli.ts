import yargs from "yargs"
import * as readline from "readline"
import { coreApi } from "./core-api"
import { log } from "./log"

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

export const ask = (query: string): Promise<string> => {
  return new Promise((resolve) => {
    rl.question(query, (answer) => {
      resolve(answer)
    })
  })
}

const options = yargs
  .command(
    "createUser",
    "Create user",
    () => {},
    async () => {
      const email = await ask("Type user's email:\n> ")
      const password = await ask("Type user's passwrd:\n> ")

      log("Creating user...")
      await coreApi.user.createUser(email, password)

      log("User created.")

      rl.close()
      process.exit()
    }
  )
  .demandCommand()
  .help().argv

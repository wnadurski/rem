import express from "express"
import { createApi } from "./api"
import { config } from "./config"

const app = express()

app.get("/", (req: any, res: any) => {
  res.send("The sedulous hyena ate the antelope!")
})

const apiRoute = express.Router().use(express.json())

createApi(apiRoute)

app.use("/api", apiRoute)

app.listen(config.port, ((err: any) => {
  if (err) {
    return console.error(err)
  }
  return console.log(`server is listening on ${config.port}`)
}) as any)

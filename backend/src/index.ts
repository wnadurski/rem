import express from "express"
import { createApi } from "./api"

const app = express()
const port = 3000

app.get("/", (req: any, res: any) => {
  res.send("The sedulous hyena ate the antelope!")
})

const apiRoute = express.Router().use(express.json())

createApi(apiRoute)

app.use("/api", apiRoute)

app.listen(port, ((err: any) => {
  if (err) {
    return console.error(err)
  }
  return console.log(`server is listening on ${port}`)
}) as any)

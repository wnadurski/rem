import { endpoints } from "./endpoints"
import { Router } from "express"

const toLowerCase = <Str extends string>(str: Str): Lowercase<Str> =>
  str.toLowerCase() as any

export const createApi = (app: Router): Router => {
  Object.values(endpoints).map((list) =>
    Object.values(list).map((endpoint) => {
      app[toLowerCase(endpoint.method)](
        endpoint.path,
        async (request, response) => {
          const result = await endpoint.handler(request.body, request)

          response.status(result.code)
          response.json(result.data)
          response.end()
        }
      )
    })
  )
  return app
}

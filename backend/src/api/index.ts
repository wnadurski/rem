import { endpoints } from "./endpoints"
import { Router } from "express"

const toLowerCase = <Str extends string>(str: Str): Lowercase<Str> =>
  str.toLowerCase() as any

export const createApi = (app: Router): Router => {
  Object.values(endpoints).map((list) =>
    Object.values(list).map((endpoint) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const f = app[toLowerCase(endpoint.method)]
      f(endpoint.path, async (request: any, response: any) => {
        const result = await (endpoint.handler as any)(request.body, request)

        response.status(result.code)
        response.json(result.data)
        response.end()
      })
    })
  )
  return app
}

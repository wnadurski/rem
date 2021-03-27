import { Endpoint } from "../../../shared/src/endpoints/utils"
import { Request, Response } from "express"

type ReturnType<A, Keys extends keyof A = keyof A> = Keys extends any
  ? { code: Keys; data: A[Keys] }
  : never

export type DescriptionToHandlers<T extends any> = {
  [K in keyof T]: {
    [K2 in keyof T[K]]: T[K][K2] extends Endpoint<any, any, any, any>
      ? {
          path: T[K][K2]["path"]
          method: T[K][K2]["method"]
          handler: (
            body: Partial<T[K][K2]["request"]>,
            request: Request
          ) => Promise<ReturnType<T[K][K2]["response"]>>
        }
      : never
  }
}

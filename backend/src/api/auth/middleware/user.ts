import { NextFunction, Request, Response } from "express"
import { coreApi } from "../../../core-api"
import { pipe } from "fp-ts/function"
import { andThen } from "ramda"
import { toUndefined } from "fp-ts/Option"
import { User } from "../../../core/users/User"

const setUser = (req: Request, user: User | undefined) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  req.user = user
}

export const getUser = (req: Request): User | undefined => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return req.user
}

const setToken = (req: Request, token: string | undefined) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  req.token = token
}

export const getToken = (req: Request): string | undefined => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return req.user
}

export const userMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction
): void => {
  const authorization = request.header("Authorization")

  if (!authorization) {
    next()
    return
  }

  const token = authorization.split(" ")[1]

  pipe(
    token,
    coreApi.user.getUserForToken,
    andThen((maybeUser) => {
      setUser(request, toUndefined(maybeUser))
      setToken(request, token)
      next()
    })
  )
}

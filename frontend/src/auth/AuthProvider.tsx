import { ReactElement, ReactFragment, useEffect, useState } from "react"
import { User } from "../User"
import { getCurrentUser, loginAttempt, logOut } from "./services"
import { getToken, removeToken, setToken } from "./token"

interface Props {
  // children: ReactElement
  render: (params: {
    user: User | undefined
    logIn: (login: string, password: string) => Promise<User | undefined>
    logOut: () => Promise<void>
  }) => ReactElement
}

const UnknownState = "UNKNOWN" as const

export const AuthProvider = ({ render }: Props): ReactElement | null => {
  const [user, setUser] = useState<User | undefined | typeof UnknownState>(
    UnknownState
  )

  useEffect(() => {
    const initialize = async () => {
      if (getToken()) {
        setUser(await getCurrentUser())
      }
    }

    initialize()
  }, [])

  const doLogOut = async () => {
    await logOut()
    removeToken()
    setUser(undefined)
  }

  const doLogIn = async (
    login: string,
    password: string
  ): Promise<User | undefined> => {
    const data = await loginAttempt(login, password)

    if (!data) {
      return undefined
    }
    setToken(data.token)

    const user = await getCurrentUser()
    setUser(user)

    return user
  }

  if (user === UnknownState) {
    return null
  } else {
    return render({ user, logOut: doLogOut, logIn: doLogIn })
  }
}

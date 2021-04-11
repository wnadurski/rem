import { ReactElement, ReactFragment, useState } from "react"
import { User } from "../User"
import { getCurrentUser, loginAttempt, logOut } from "./services"
import { removeToken, setToken } from "./token"

interface Props {
  // children: ReactElement
  render: (params: {
    user: User | undefined
    logIn: (login: string, password: string) => Promise<User | undefined>
    logOut: () => Promise<void>
  }) => ReactElement
}

export const AuthProvider = ({ render }: Props): ReactElement => {
  const [user, setUser] = useState<User | undefined>(undefined)

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

  return render({ user, logOut: doLogOut, logIn: doLogIn })
}

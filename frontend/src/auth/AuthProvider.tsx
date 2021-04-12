import {
  ReactElement,
  ReactFragment,
  useEffect,
  useState,
  createContext,
} from "react"
import { User } from "../User"
import { getCurrentUser, loginAttempt, logOut } from "./services"
import { getToken, removeToken, setToken } from "./token"

interface Props {
  children: ReactElement
}
interface AuthContextValue {
  user: User | undefined
  login: (login: string, password: string) => Promise<User | undefined>
  logout: () => Promise<void>
}

const UnknownState = "UNKNOWN" as const
export const AuthContext = createContext<AuthContextValue>({
  user: undefined,
  login: () => Promise.resolve(undefined),
  logout: () => Promise.resolve(undefined),
})

export const AuthProvider = ({ children }: Props): ReactElement | null => {
  const [user, setUser] = useState<User | undefined | typeof UnknownState>(
    UnknownState
  )
  useEffect(() => {
    const initialize = async () => {
      if (getToken()) {
        setUser(await getCurrentUser())
      } else {
        setUser(undefined)
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
    // eslint-disable-next-line no-console
    console.log("jednak tutaj")
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
    // eslint-disable-next-line no-console
    console.log("tam")
    return null
  } else {
    // eslint-disable-next-line no-console
    console.log("tutaj")
    return (
      <AuthContext.Provider
        value={{
          user: user,
          login: doLogIn,
          logout: doLogOut,
        }}
      >
        {children}
      </AuthContext.Provider>
    )
  }
}

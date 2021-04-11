import WelcomePage from "./pages/WelcomePage"
import LoginForm from "./auth/LoginForm"
import React, { ReactElement } from "react"
import { User } from "./User"

interface Props {
  user: User | undefined
  logIn: (login: string, password: string) => Promise<User | undefined>
  logOut: () => Promise<void>
}

export const Router = ({ user, logOut, logIn }: Props): ReactElement => {
  return user ? (
    <WelcomePage onLogOut={logOut} />
  ) : (
    <LoginForm loginAsUser={logIn} />
  )
}

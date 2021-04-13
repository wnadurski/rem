import WelcomePage from "./pages/WelcomePage"
import LoginForm from "./auth/LoginForm"
import React, { ReactElement, useContext } from "react"
import { AuthContext } from "./auth/AuthProvider"

export const Router = (): ReactElement => {
  const { user } = useContext(AuthContext)
  return user ? <WelcomePage /> : <LoginForm />
}

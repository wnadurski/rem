import WelcomePage from "./pages/WelcomePage"
import LoginForm from "./auth/LoginForm"
import React, { ReactElement, useContext } from "react"
import { AuthContext } from "./auth/AuthProvider"
import { HashRouter } from "react-router-dom"

export const Router = (): ReactElement => {
  const { user } = useContext(AuthContext)
  return user ? (
    <HashRouter>
      <WelcomePage />{" "}
    </HashRouter>
  ) : (
    <HashRouter>
      <LoginForm />
    </HashRouter>
  )
}

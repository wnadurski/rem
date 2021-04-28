import React, { ReactElement, useContext } from "react"
import { AuthContext } from "../auth/AuthProvider"

interface Props {
  children: ReactElement
}

const WelcomePage = ({ children }: Props): ReactElement => {
  const { logout, user } = useContext(AuthContext)
  return (
    <div>
      <h1>Hi, {user ? user.email : "stranger"}</h1>
      <button
        className="submit-button"
        onClick={(e) => {
          e.preventDefault()
          logout()
        }}
      >
        Log out
      </button>
      {children}
    </div>
  )
}
export default WelcomePage

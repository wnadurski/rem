import React, { ReactElement, useContext } from "react"
import { AuthContext } from "../auth/AuthProvider"

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {}

const WelcomePage = (): ReactElement => {
  const { logout } = useContext(AuthContext)
  return (
    <div>
      <h1>Hi, your token has been saved in local storage</h1>
      <button
        className="submit-button"
        onClick={(e) => {
          e.preventDefault()
          logout()
        }}
      >
        Log out
      </button>
    </div>
  )
}
export default WelcomePage

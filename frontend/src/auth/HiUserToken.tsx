import React, { ReactElement, useState } from "react"
import App from "../App"

const HiUserToken = (): ReactElement => {
  const [isLoggedIn, setLoggedIn] = useState(false)

  return (
    <div>
      <h1>Hi, your token has been saved in local storage</h1>
      <button
        className="submit-button"
        onClick={(e) => {
          e.preventDefault
          setLoggedIn(false)
          window.localStorage.removeItem("token")
          return <App />
        }}
      >
        Log out
      </button>
    </div>
  )
}
export default HiUserToken

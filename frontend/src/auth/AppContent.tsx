import React, { ReactElement } from "react"
type Props = {
  logOut: () => void
}
const AppContent = ({ logOut }: Props): ReactElement => {
  return (
    <div>
      <h1>Hi, your token has been saved in local storage</h1>
      <button
        className="submit-button"
        onClick={(e) => {
          e.preventDefault()
          window.localStorage.removeItem("token")
          logOut()
        }}
      >
        Log out
      </button>
    </div>
  )
}
export default AppContent

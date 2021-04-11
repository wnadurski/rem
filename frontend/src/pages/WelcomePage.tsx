import React, { ReactElement } from "react"

type Props = {
  onLogOut: () => void
}

const WelcomePage = ({ onLogOut }: Props): ReactElement => {
  return (
    <div>
      <h1>Hi, your token has been saved in local storage</h1>
      <button
        className="submit-button"
        onClick={(e) => {
          e.preventDefault()
          onLogOut()
        }}
      >
        Log out
      </button>
    </div>
  )
}
export default WelcomePage

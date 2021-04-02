import React, { ReactElement, useState } from "react"
//import { passwordIsCorrect } from "./passwordIsCorrect"
import { getCurrentUser, loginAttempt } from "./services"
//import { userIsFound } from "./userIsFound"
import App from "../App"
import { User } from "../User"

type Props = {
  loginAsUser: (user: User) => void
}

const LoginForm = ({ loginAsUser }: Props): ReactElement => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<undefined | string>(undefined)

  return (
    <div>
      <form
        className="flex-column"
        onSubmit={(e) => {
          e.preventDefault()
          setError(undefined)
          loginAttempt(username, password)
            .then((res) => {
              if (res === undefined) {
                throw Error("Authentication error")
              }

              window.localStorage.setItem("token", res.token)
              return getCurrentUser()
            })
            .then((res) => {
              if (res === undefined) {
                throw Error("Weird error")
              }
              loginAsUser(res)
            })
            .catch((e) => {
              setError("Cos sie stalo")
            })
        }}
      >
        <label htmlFor="username" className="field">
          <input
            className="text-input"
            id="username"
            value={username}
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            onBlur={(e) => setUsername(e.target.value)}
          />
        </label>
        <label htmlFor="password" className="field">
          <input
            className="text-input"
            id="password"
            value={password}
            placeholder="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            onBlur={(e) => setPassword(e.target.value)}
          />
        </label>
        <label htmlFor="remember-me" className="remember-me">
          Remember me
          <input id="remember-me" type="checkbox" />
        </label>
        <button type="submit" className="submit-button">
          Log in
        </button>
      </form>
      {error}
    </div>
  )
}
export default LoginForm

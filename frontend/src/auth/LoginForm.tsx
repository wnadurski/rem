import React, { ReactElement, useContext, useState } from "react"
import { getCurrentUser, loginAttempt } from "./services"
import { User } from "../User"
import { setToken } from "./token"
import { AuthContext } from "./AuthProvider"

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {}

const LoginForm = (): ReactElement => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<undefined | string>(undefined)
  const { login } = useContext(AuthContext)

  return (
    <div>
      <form
        className="flex-column"
        onSubmit={(e) => {
          e.preventDefault()
          setError(undefined)
          login(username, password).then((user) => {
            if (!user) {
              setError("Cos poszlo nie tak")
            }
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

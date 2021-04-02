import React, { ReactElement, useState } from "react"
//import { passwordIsCorrect } from "./passwordIsCorrect"
import { getCurrentUser, loginAttempt } from "./services"
//import { userIsFound } from "./userIsFound"
import App from "../App"

const LoginForm = (): ReactElement => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isLoggedIn, setLoggedIn] = useState(false)
  const [user, setUser] = useState("")
  const [token, setToken] = useState("")
  const [error, setError] = useState("")

  if (isLoggedIn) {
    getCurrentUser().then(({ user, token }: { user: any; token: any }) => {
      setUser(user)
      setToken(token)
    })
  }
  return (
    <div>
      <form
        className="flex-column"
        onSubmit={(e) => {
          e.preventDefault()
          // wrzucilbym tego ifa do jednej funkcji asynchronicznej w services (bo trzeba sfetchowac chyba czy logowanie sie udalo)
          //if (userIsFound() && passwordIsCorrect()) {
          loginAttempt(username, password).then(
            ({ user, token }: { user: any; token: any }) => {
              setUser(user)
              setToken(token)
            }
          )
          //.catch((error) => setError(error)) // moge tak zrobic? czy sparsowac to na stringa?
          setLoggedIn(true)
          window.localStorage.setItem("token", token)
          //to tez byloby w tej funkcji... moze
          //} else setError("Invalid username-password combination")
          return <App />
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

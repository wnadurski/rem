import React, { ReactElement, useState } from "react"
import "./App.css"
import LoginForm from "./auth/LoginForm"
import AppContent from "./auth/AppContent"
import { User } from "./User"
import { logOut } from "./auth/services"
import { removeToken } from "./auth/token"

function App(): ReactElement {
  const [user, setUser] = useState<User | undefined>(undefined)

  if (user) {
    return (
      <div className="App">
        <header className="App-header">
          <AppContent
            onLogOut={() => {
              logOut()
              removeToken()
              setUser(undefined)
            }}
          />
        </header>
      </div>
    )
  } else
    return (
      <div className="App">
        <header className="App-header">
          <LoginForm loginAsUser={setUser} />
        </header>
      </div>
    )
}

export default App

import React, { ReactElement, useState, useEffect } from "react"
import "./App.css"
import LoginForm from "./auth/LoginForm"
import HiUserToken from "./auth/HiUserToken"
import { getCurrentUser } from "./auth/services"
import { User } from "./User"

function App(): ReactElement {
  const [user, setUser] = useState<User | undefined>(undefined)

  if (user) {
    return (
      <div className="App">
        <header className="App-header">
          <HiUserToken />
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

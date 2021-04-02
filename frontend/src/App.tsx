import React, { ReactElement, useState, useEffect } from "react"
import "./App.css"
import LoginForm from "./auth/LoginForm"
import HiUserToken from "./auth/HiUserToken"
import { getCurrentUser } from "./auth/services"

function App(): ReactElement {
  if (getCurrentUser()) {
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
          <LoginForm />
        </header>
      </div>
    )
}

export default App

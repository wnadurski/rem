import React, { ReactElement } from "react"
import "./App.css"
import LoginForm from "./LoginForm"

function App(): ReactElement {
  return (
    <div className="App">
      <header className="App-header">
        <LoginForm />
      </header>
    </div>
  )
}

export default App

import React, { ReactElement } from "react"
import "./App.css"
import MyForm from "./LoginForm"

/*const App = () => {
  return(
    <div id ="root">
      <h1>Something</h1>
      <MyForm />

    </div>
  )
}*/

function App(): ReactElement {
  return (
    <div className="App">
      <header className="App-header">
        <MyForm />
      </header>
    </div>
  )
}

export default App

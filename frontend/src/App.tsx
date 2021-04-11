import React, { ReactElement } from "react"
import "./App.css"
import { PageContainer } from "./layout/PageContainer"
import { AuthProvider } from "./auth/AuthProvider"
import { Router } from "./Router"

function App(): ReactElement {
  return (
    <AuthProvider
      render={({ user, logIn, logOut }) => {
        return (
          <PageContainer>
            <Router user={user} logOut={logOut} logIn={logIn} />
          </PageContainer>
        )
      }}
    />
  )
}

export default App

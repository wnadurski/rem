import React, { ReactElement } from "react"
import "./App.css"
import { PageContainer } from "./layout/PageContainer"
import { AuthProvider } from "./auth/AuthProvider"
import { Router } from "./Router"

function App(): ReactElement {
  return (
    <AuthProvider>
      <PageContainer>
        <Router />
      </PageContainer>
    </AuthProvider>
  )
}

export default App

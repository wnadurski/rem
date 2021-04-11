import React, { ReactElement, useState } from "react"
import "./App.css"
import LoginForm from "./auth/LoginForm"
import WelcomePage from "./pages/WelcomePage"
import { User } from "./User"
import { logOut } from "./auth/services"
import { removeToken } from "./auth/token"
import { PageContainer } from "./layout/PageContainer"

function App(): ReactElement {
  const [user, setUser] = useState<User | undefined>(undefined)

  return (
    <PageContainer>
      {user ? (
        <WelcomePage
          onLogOut={() => {
            logOut()
            removeToken()
            setUser(undefined)
          }}
        />
      ) : (
        <LoginForm loginAsUser={setUser} />
      )}
    </PageContainer>
  )
}

export default App

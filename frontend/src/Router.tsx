import React, { ReactElement, useContext } from "react"
import { HashRouter, Link, Switch, Route } from "react-router-dom"
import { AuthContext } from "./auth/AuthProvider"
import LoginForm from "./auth/LoginForm"
import WelcomePage from "./pages/WelcomePage"
import ListedEstates from "./estates/ListedEstates"
import EstateAdder from "./estates/EstateAdder"
import StarterEstate from "./estates/StarterEstate"

export const Router = (): ReactElement => {
  const { user } = useContext(AuthContext)

  return (
    <HashRouter>
      <Switch>
        <Route path="/estates/add">
          <EstateAdder>
            <Link to="/">Home</Link>
          </EstateAdder>
        </Route>
        <Route path="/estates/:id">
          <StarterEstate>
            <Link to="/">Home</Link>
          </StarterEstate>
        </Route>
        <Route path="/estates">
          <ListedEstates />
        </Route>
        <Route path="/">
          {user ? (
            <WelcomePage>
              <Link to="/estates">View estates</Link>
            </WelcomePage>
          ) : (
            <LoginForm />
          )}
        </Route>
      </Switch>
    </HashRouter>
  )
}

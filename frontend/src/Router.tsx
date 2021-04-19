import React, { ReactElement, useContext } from "react"
import { HashRouter, Link, Switch, Route } from "react-router-dom"
import { AuthContext } from "./auth/AuthProvider"
import LoginForm from "./auth/LoginForm"
import WelcomePage from "./pages/WelcomePage"
import ListedEstates from "./estates/ListedEstates"
import EstateAdder from "./estates/EstateAdder"

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
        <Route path="/estates">
          <ListedEstates>
            <div>
              <Link to="/estates/add">Add estates</Link>
              <Link to="/">Home</Link>
            </div>
          </ListedEstates>
        </Route>
        <Route path="/">
          <div>
            {user ? (
              <WelcomePage>
                <Link to="/estates">View estates</Link>
              </WelcomePage>
            ) : (
              <LoginForm />
            )}
          </div>
        </Route>
      </Switch>
    </HashRouter>
  )
}

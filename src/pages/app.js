import React from "react"
import { Router } from "@reach/router"
import PrivateRoute from "../components/privateRoute"
import Admin from "../components/admin/admin"
import Profile from "../components/profile/profile"
import Login from "../components/login"

const App = () => {
  return (
    // Router Help
    // https://reach.tech/router/api/RouteComponent
    <Router basepath="/app">
      <PrivateRoute path="/profile" component={Profile} />
      <PrivateRoute path="/admin" component={Admin} />
      <Login path="/login" />
    </Router>
  )
}
export default App

// 2022-07-15
// PrivateRoute was not working before because I
// was forcing Gatsby to create pages at these routes.
// Now I can remove a lot of the conditional logics
// and auth checking in the affected components that
// were previously in place because the routing was
// acting whack. Not anymore!

import React from "react"
import { Router } from "@reach/router"
import PrivateRoute from "../components/privateRoute"
import Admin from "../components/admin/admin"
import Profile from "../components/profile"
import Login from "./login"
import PageNotFound from "../pages/404"

const App = () => {
  return (
    // Router Help
    // https://reach.tech/router/api/RouteComponent
    <Router basepath="/app">
      <PrivateRoute path="/profile" component={Profile} />
      <PrivateRoute path="/admin" component={Admin} />
      {/* <Login path="/login" /> */}
      {/* <PageNotFound path="/404" default /> */}
      {/*^^^^^^^^^^
        This is not the same as hitting a regular 404 page.
        This renders the actual 404 page, but only if an
        unauthorized user tries accessing a nested path like
        /app/.../the-nested-url/
        This is necessary because gatsby-node ~currently~ declares 
        that any page after /app/* should be created, even if all 
        that's rendered is a blank page.
      */}
    </Router>
  )
}
export default App

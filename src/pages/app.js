import React from "react"
import { Router } from "@reach/router"
import PrivateRoute from "../components/privateRoute"
import { Profile } from "../components/Profile"
import { Dashboard } from "../components/Dashboard"

const App = () => (
  <Router>
    <PrivateRoute path="/app/profile" component={Profile} />
    <PrivateRoute path="/app/dashboard" component={Dashboard} />
  </Router>
)

export default App

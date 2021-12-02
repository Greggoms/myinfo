import React from "react"
import { Router } from "@reach/router"
import PrivateRoute from "../components/privateRoute"
import { Profile } from "../components/Profile"

const App = () => (
  <Router>
    <PrivateRoute path="/app/profile" component={Profile} />
  </Router>
)

export default App

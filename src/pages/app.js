import React from "react"
import { Router } from "@reach/router"
import PrivateRoute from "../components/privateRoute"
import ProfilePage from "./profile"
import DashboardPage from "./dashboard"

const App = () => {
  return (
    <Router>
      <PrivateRoute path="/app/profile" component={ProfilePage} />
      <PrivateRoute path="/app/dashboard" component={DashboardPage} />
    </Router>
  )
}
export default App

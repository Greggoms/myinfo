import React from "react"
import { Router } from "@reach/router"
import PrivateRoute from "../components/privateRoute"
import ProfilePage from "./profile"
import DashboardPage from "./dashboard"
import ScrollToTop from "../services/scrollToTop"

const App = () => {
  return (
    <Router>
      <ScrollToTop path="/" />
      <PrivateRoute path="/app/profile" component={ProfilePage} />
      <PrivateRoute path="/app/dashboard" component={DashboardPage} />
    </Router>
  )
}
export default App

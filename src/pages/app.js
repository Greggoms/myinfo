import React from "react"
import { Router } from "@reach/router"
import PrivateRoute from "../components/privateRoute"
import { Profile } from "../components/Profile"
import { Dashboard } from "../components/Dashboard"
const netlifyIdentity = require("netlify-identity-widget")

const App = () => {
  const user = netlifyIdentity.store.user
  let profileUrl
  if (user !== null) {
    profileUrl = `/app/profile/${user.id}`
    return profileUrl
  } else {
    profileUrl = `/app/profile/no-user`
  }
  return (
    <Router>
      <PrivateRoute path={profileUrl} component={Profile} />
      <PrivateRoute path="/app/dashboard" component={Dashboard} />
    </Router>
  )
}

export default App

import React from "react"
import { Notification } from "./Notification"
const netlifyIdentity = require("netlify-identity-widget")

const PrivateRoute = ({ component: Component, location, ...rest }) => {
  const user = netlifyIdentity.store.user
  if (
    !user &&
    (location.pathname === `/app/profile` ||
      location.pathname === `/app/dashboard`)
  ) {
    return <Notification message="You must be logged in to see this content" />
  }
  return <Component {...rest} />
}
export default PrivateRoute

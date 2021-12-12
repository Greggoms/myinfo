import React from "react"
import { Notification } from "./Notification"
import Seo from "./seo"
const netlifyIdentity = require("netlify-identity-widget")

const PrivateRoute = ({ component: Component, location, ...rest }) => {
  const user = netlifyIdentity.currentUser()
  if (!user && location.pathname === `/app/profile`) {
    return (
      <>
        <Seo title="Profile" />
        <Notification message="You must be logged in to see this content" />
      </>
    )
  } else if (!user && location.pathname === `/app/dashboard`) {
    return (
      <>
        <Seo title="Dashboard" />
        <Notification message="You must be logged in to see this content" />
      </>
    )
  }
  return <Component {...rest} />
}
export default PrivateRoute

import React from "react"
import { Notification } from "./Notification"
import Seo from "./seo"
import Svg from "../images/svg/lock.svg"
const netlifyIdentity = require("netlify-identity-widget")

const PrivateRoute = ({ component: Component, location, ...rest }) => {
  const user = netlifyIdentity.currentUser()
  if (!user && location.pathname === `/app/profile`) {
    return (
      <>
        <Seo title="Profile" />
        <Notification message="You must be logged in to view your profile." />
        <object style={{ display: "flex", justifyContent: "center" }}>
          <Svg style={{ maxWidth: "30rem", opacity: 0.5 }} />
        </object>
      </>
    )
  } else if (!user && location.pathname === `/app/dashboard`) {
    return (
      <>
        <Seo title="Dashboard" />
        <Notification message="You must be logged in to see the dashboard." />
        <object style={{ display: "flex", justifyContent: "center" }}>
          <Svg style={{ maxWidth: "30rem", opacity: 0.5 }} />
        </object>
      </>
    )
  }
  return <Component {...rest} />
}
export default PrivateRoute

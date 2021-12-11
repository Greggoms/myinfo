import React from "react"
import Seo from "./seo"
import { ReactTable } from "./ReactTable"
const netlifyIdentity = require("netlify-identity-widget")

export const Dashboard = () => {
  const user = netlifyIdentity.currentUser()
  let role = (user && user.app_metadata.roles.map(role => role)) || ""
  if (role == "Admin") {
    return (
      <>
        <Seo title={`${user.user_metadata.full_name}'s Dashboard`} />
        <ReactTable />
      </>
    )
  } else {
    return (
      <>
        <Seo title="Dashboard" />
        <h2>You need Admin Rights for this.</h2>
        <h2>Your role: {role}</h2>
      </>
    )
  }
}

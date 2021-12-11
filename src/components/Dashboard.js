import React from "react"
import Seo from "./seo"
import { ReactTable } from "./ReactTable"
const netlifyIdentity = require("netlify-identity-widget")

export const Dashboard = () => {
  const user = netlifyIdentity.currentUser()
  const role =
    user && user.app_metadata.roles
      ? user.app_metadata.roles.map(role => role)
      : null
  // eslint-disable-next-line
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
      </>
    )
  }
}

import React from "react"
import Seo from "./seo"
import { ReactTable } from "./ReactTable"
import { Notification } from "../components/Notification"
import {
  DashboardPageContainer,
  DashboardPageErrorContainer,
} from "../elements"
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
      <DashboardPageContainer>
        <Seo title={`${user.user_metadata.full_name}'s Dashboard`} />
        <ReactTable />
      </DashboardPageContainer>
    )
  } else {
    return (
      <DashboardPageErrorContainer>
        <Seo title="Dashboard" />
        <Notification message="You need Admin Rights for this." />
      </DashboardPageErrorContainer>
    )
  }
}

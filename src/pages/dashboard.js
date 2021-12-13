import React from "react"
import Seo from "../components/seo"
import { ReactTable } from "../components/ReactTable"
import { Notification } from "../components/Notification"
import {
  DashboardPageContainer,
  DashboardPageErrorContainer,
} from "../elements"
import Svg from "../images/svg/lock.svg"
const netlifyIdentity = require("netlify-identity-widget")

const DashboardPage = () => {
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
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Svg style={{ maxWidth: "30rem", opacity: 0.5 }} />
        </div>
      </DashboardPageErrorContainer>
    )
  }
}

export default DashboardPage

import React from "react"
import Seo from "./seo"
import { ReactTable } from "./ReactTable"
import styled from "styled-components"
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
        <h2>You need Admin Rights for this.</h2>
      </DashboardPageErrorContainer>
    )
  }
}

const DashboardPageContainer = styled.div`
  margin: 0 auto;
  max-width: 100rem;
`
const DashboardPageErrorContainer = styled.div`
  margin: 0 auto;
  max-width: 960px;
`

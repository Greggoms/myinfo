import React, { useState } from "react"
import Seo from "../components/seo"
import { ReactTable } from "../components/ReactTable"
import { DashboardProfiles } from "../components/DashboardProfiles"
import { Notification } from "../components/Notification"
import {
  DashboardPageContainer,
  DashboardPageErrorContainer,
  EmployeeViewContainer,
} from "../elements"
import Svg from "../svg/lock.svg"
const netlifyIdentity = require("netlify-identity-widget")

const DashboardPage = () => {
  const [tableIsActive, setTableIsActive] = useState(true)
  const [profileIsActive, setProfileIsActive] = useState(false)
  const user = netlifyIdentity.currentUser()
  const role =
    user && user.app_metadata.roles
      ? user.app_metadata.roles.map(role => role)
      : null
  // eslint-disable-next-line
  if (role == "Admin") {
    const styles = {
      active: {
        gridRow: 1,
        gridColumn: 1,
        transform: "scale(1)",
      },
      inactive: {
        gridRow: 2,
        gridColumn: 1,
        transform: "scale(0)",
      },
    }
    return (
      <DashboardPageContainer>
        <Seo title={`${user.user_metadata.full_name}'s Dashboard`} />
        <EmployeeViewContainer>
          <div className="button-container">
            <button
              onClick={() => {
                setTableIsActive(!tableIsActive)
                setProfileIsActive(!profileIsActive)
              }}
              style={
                tableIsActive ? { color: "#F2F2F2" } : { color: "#595959" }
              }
            >
              Table
            </button>
            <button
              onClick={() => {
                setProfileIsActive(!profileIsActive)
                setTableIsActive(!tableIsActive)
              }}
              style={
                profileIsActive ? { color: "#F2F2F2" } : { color: "#595959" }
              }
            >
              Cards
            </button>
          </div>
          <div className="selected-component">
            <div style={tableIsActive ? styles.active : styles.inactive}>
              <ReactTable />
            </div>
            <div style={profileIsActive ? styles.active : styles.inactive}>
              <DashboardProfiles />
            </div>
          </div>
        </EmployeeViewContainer>
      </DashboardPageContainer>
    )
  } else {
    return (
      <DashboardPageErrorContainer>
        <Seo title="Dashboard" />
        <Notification message="You need Admin Rights for this." />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Svg
            style={{
              width: "100%",
              maxWidth: "30rem",
              height: "100%",
              opacity: 0.5,
            }}
          />
        </div>
      </DashboardPageErrorContainer>
    )
  }
}

export default DashboardPage

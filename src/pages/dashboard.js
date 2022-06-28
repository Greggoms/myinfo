import React, { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { selectUserFireDoc } from "../app/features/userSlice"
import { GatsbySeo } from "gatsby-plugin-next-seo"

import { UserListing } from "../components/admin/UserListing"
import { ReactTable } from "../components/ReactTable"
import { Notification } from "../components/Notification"
import Svg from "../svg/lock.svg"
import { DashboardButtonsContainer } from "../css"

const DashboardPage = () => {
  useEffect(() => {
    if (window !== "undefined") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    }
  }, [])

  const userFireDoc = useSelector(selectUserFireDoc)

  const [panelView, setPanelView] = useState(true)
  const [tableView, setTableView] = useState(false)

  const handleLayoutSelection = e => {
    if (e.target.value === "panels") {
      setPanelView(true)
      setTableView(false)
    } else if (e.target.value === "table") {
      setTableView(true)
      setPanelView(false)
    }
  }

  const buttonStyles = {
    active: {
      background: "inherit",
      border: `2px solid #00c5d6`,
      color: "#F2F2F2",
    },
    inactive: {},
  }

  if (userFireDoc && userFireDoc.role === "admin") {
    return (
      <>
        <GatsbySeo
          nofollow={true}
          noindex={true}
          title={`${userFireDoc.name}'s Dashboard | AbbyHQ`}
        />
        <DashboardButtonsContainer>
          <h3>View</h3>
          <div className="views">
            <button
              type="button"
              onClick={handleLayoutSelection}
              value="panels"
              style={panelView ? buttonStyles.active : buttonStyles.inactive}
            >
              Panels
            </button>
            <button
              onClick={handleLayoutSelection}
              value="table"
              type="button"
              style={tableView ? buttonStyles.active : buttonStyles.inactive}
            >
              Table
            </button>
          </div>
        </DashboardButtonsContainer>
        {panelView && <UserListing />}
        {tableView && <ReactTable />}
      </>
    )
  } else {
    return (
      <>
        <GatsbySeo nofollow={true} noindex={true} title="Dashboard | AbbyHQ" />
        <Notification message="You need Admin Rights for this." />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Svg
            style={{
              width: "100%",
              maxWidth: "25rem",
              height: "100%",
              opacity: 0.5,
            }}
          />
        </div>
      </>
    )
  }
}

export default DashboardPage

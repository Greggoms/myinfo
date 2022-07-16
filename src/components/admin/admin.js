import React, { useState } from "react"
import { useSelector } from "react-redux"
import { selectUserFireDoc } from "../../app/features/userSlice"
import { GatsbySeo } from "gatsby-plugin-next-seo"

import { UserListing } from "./UserListing"
import { ReactTable } from "../ReactTable"
import { AdminButtonsContainer } from "../../css"
import { navigate } from "@reach/router"

const AdminPage = () => {
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
  if (!userFireDoc || userFireDoc.role !== "admin") {
    navigate("/app/profile")
  } else {
    return (
      <>
        <GatsbySeo
          nofollow={true}
          noindex={true}
          title={`${userFireDoc.name}'s Admin | AbbyHQ`}
        />

        {/* <div
          style={{
            width: "fit-content",
            maxWidth: "500px",
            margin: "0 auto",
            background: "#A7ECF2",
            color: "#333",
            padding: "10px",
          }}
        >
          Bug spotted! - Admins cannot accept/deny requests unless they themself
          have a PTO submission... Working on a solution.
        </div> */}

        <AdminButtonsContainer>
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
        </AdminButtonsContainer>
        {panelView && <UserListing />}
        {tableView && <ReactTable />}
      </>
    )
  }
}

export default AdminPage

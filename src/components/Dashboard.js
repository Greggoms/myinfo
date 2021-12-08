import React from "react"
import Seo from "./seo"
import { ReactTable } from "./ReactTable"

export const Dashboard = () => (
  <>
    <Seo title="Home" />
    <div>
      <p style={{ marginBottom: 0 }}>
        <strong>Bold Name</strong> - Manager
      </p>
      <p style={{ marginBottom: 0 }}>
        <em>Italicized Name</em> - Assistant Manager
      </p>
      <p style={{ marginBottom: 0 }}>Regular Name - Associate</p>
    </div>
    <ReactTable />
  </>
)

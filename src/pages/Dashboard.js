import * as React from "react"
import Seo from "../components/seo"
import { ReactTable } from "../components/ReactTable"

const DashboardPage = () => (
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

export default DashboardPage

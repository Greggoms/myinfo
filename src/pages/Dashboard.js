import * as React from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"
import { ReactTable } from "../components/ReactTable"

const DashboardPage = () => (
  <Layout>
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
  </Layout>
)

export default DashboardPage

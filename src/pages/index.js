import * as React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import { Table } from "../components/Table"

const IndexPage = () => (
  <Layout>
    <Seo title="Home" />
    <Link to="/ProfilePage">Go to profile page</Link>
    <Table />
  </Layout>
)

export default IndexPage

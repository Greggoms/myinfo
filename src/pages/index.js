import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { Signup } from "../services/Signup"

const IndexPage = () => {
  return (
    <Layout>
      <Seo title="Home" />
      <div>
        <h1>Hello "User"!</h1>
        <p>You should log in to see restricted content</p>
        <p>
          You are logged in, so check your{" "}
          <Link to="/app/profile">profile</Link>
        </p>
        <Signup />
      </div>
    </Layout>
  )
}

export default IndexPage

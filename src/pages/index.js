import * as React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { getUser, isLoggedIn } from "../services/auth"

const IndexPage = () => (
  <Layout>
    <Seo title="Home" />
    <div>
      <h1>Hello {isLoggedIn() ? getUser().name : "User"}!</h1>
      <p>
        {isLoggedIn() ? (
          <>
            You are logged in, so check your{" "}
            <Link to="/app/profile">profile</Link>
          </>
        ) : (
          <>
            You should <Link to="/app/login">log in</Link> to see restricted
            content
          </>
        )}
      </p>
    </div>
  </Layout>
)

export default IndexPage

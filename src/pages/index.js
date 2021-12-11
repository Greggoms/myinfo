import React from "react"
import { Link } from "gatsby"
import Seo from "../components/seo"
const netlifyIdentity = require("netlify-identity-widget")

const IndexPage = () => {
  const user = netlifyIdentity.currentUser()

  return (
    <>
      <Seo title="Home" />
      <div>
        <h1>Hey {user ? user.user_metadata.full_name : "There!"}</h1>
        {user ? (
          <h2>
            Now that you're here, check out your{" "}
            <Link to="/app/profile">profile!</Link>
          </h2>
        ) : (
          <>
            <p>
              Get started by{" "}
              <button
                onClick={() => {
                  netlifyIdentity.init()
                  netlifyIdentity.open("login")
                }}
                style={{ textDecoration: "underline", cursor: "pointer" }}
              >
                Logging in
              </button>
              !
            </p>
            <p>
              New around here?{" "}
              <button
                onClick={() => {
                  netlifyIdentity.init()
                  netlifyIdentity.open("signup")
                }}
                style={{ textDecoration: "underline", cursor: "pointer" }}
              >
                Create an account
              </button>
              .
            </p>
          </>
        )}
      </div>
    </>
  )
}

export default IndexPage

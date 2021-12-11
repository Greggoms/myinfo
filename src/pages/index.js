import React from "react"
import { Link } from "gatsby"
import Seo from "../components/seo"
import styled from "styled-components"
const netlifyIdentity = require("netlify-identity-widget")

const IndexPage = () => {
  const user = netlifyIdentity.currentUser()

  return (
    <IndexPageContainer>
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
              <ButtonLinkContainer
                onClick={() => {
                  netlifyIdentity.init()
                  netlifyIdentity.open("login")
                }}
                style={{ textDecoration: "underline", cursor: "pointer" }}
              >
                Logging in
              </ButtonLinkContainer>
              !
            </p>
            <p>
              New around here?{" "}
              <ButtonLinkContainer
                onClick={() => {
                  netlifyIdentity.init()
                  netlifyIdentity.open("signup")
                }}
                style={{ textDecoration: "underline", cursor: "pointer" }}
              >
                Create an account
              </ButtonLinkContainer>
              .
            </p>
          </>
        )}
      </div>
    </IndexPageContainer>
  )
}

export default IndexPage

const IndexPageContainer = styled.div`
  h1 {
    margin-bottom: 1rem;
  }
  p {
    margin-bottom: 2rem;
  }
`

const ButtonLinkContainer = styled.button`
  border: none;
  background: rgba(181, 218, 255, 0.5);
  padding: 0.2rem 0.1rem;
`

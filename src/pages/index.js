import React from "react"
import { Link } from "gatsby"

import Seo from "../components/seo"
import {
  IndexPageContainer,
  ButtonLinkContainer,
  CTAContainer,
} from "../elements"

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
            <ButtonLinkContainer>
              <Link to="/app/profile">profile!</Link>
            </ButtonLinkContainer>
          </h2>
        ) : (
          <>
            <CTAContainer>
              <ButtonLinkContainer
                className="primary"
                onClick={() => {
                  netlifyIdentity.init()
                  netlifyIdentity.open("login")
                }}
              >
                Login
              </ButtonLinkContainer>
              <ButtonLinkContainer
                className="secondary"
                onClick={() => {
                  netlifyIdentity.init()
                  netlifyIdentity.open("signup")
                }}
                style={{ background: "inherit !important" }}
              >
                Create an account
              </ButtonLinkContainer>
            </CTAContainer>
            <div className="intro">
              <p>
                This is the place where you can view some of your employee
                information.
              </p>
              <p>
                Sign up with the email you use to login to Lightspeed if you
                want instant access to PTO info. If you choose another email, I
                will have to manually connect you to your PTO info. You can
                choose any username you want.
              </p>
            </div>
          </>
        )}
      </div>
    </IndexPageContainer>
  )
}

export default IndexPage

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
                If this is your first time here, create an account with the
                email you use to login to Lightspeed if you want instant access
                to PTO info. If you choose another email, I will have to
                manually connect you to your PTO info.
              </p>
              <p>
                Once your account is created, you will be emailed a confirmation
                link. You MUST confirm to be allowed to sign in. Upon
                confirmation, you will be sent to your profile page.
              </p>
            </div>
          </>
        )}
      </div>
    </IndexPageContainer>
  )
}

export default IndexPage

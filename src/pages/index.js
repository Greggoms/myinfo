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
                imformation.
              </p>
              <p>
                Please sign up before trying to view your profile. You will be
                able to see your info once you have confirmed your email.
              </p>
              <p>
                PTO info can be viewed once I manually connect it after you
                create your account. This will take ~5min if created between
                9am-5pm mon-fri.
              </p>
              <p>
                Consider this website in beta. There are many more visual and
                fuctional improvements to add.
              </p>
            </div>
          </>
        )}
      </div>
    </IndexPageContainer>
  )
}

export default IndexPage

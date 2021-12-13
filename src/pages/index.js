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
                Sign up before trying to view your profile. Please use a name I
                can recognize so I know who's signing up.
              </p>
              <p>
                PTO info can be viewed once I manually connect it after you
                create your account. This shouldn't take long, but keep in mind
                the website will have to be rebuilt everytime an account is
                added. I'll keep an eye out for signups and try to hook you up
                asap. If I'm taking too long then dm me on the groupme.
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

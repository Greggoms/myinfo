import React from "react"
import Seo from "../components/seo"
// import { isBrowser } from "../services/isBrowser"
const netlifyIdentity = require("netlify-identity-widget")

const IndexPage = () => {
  const user = netlifyIdentity.store.user
  return (
    <>
      <Seo title="Home" />
      <div>
        <h1>Hey {user ? user.user_metadata.full_name : "There!"}</h1>
        {user ? (
          <h2>Now that you're here. Check out your profile!</h2>
        ) : (
          <h2>Knock knock, anyone there?</h2>
        )}
      </div>
    </>
  )
}

export default IndexPage

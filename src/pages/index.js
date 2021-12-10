import React from "react"
import { Link } from "gatsby"
import Seo from "../components/seo"
const netlifyIdentity = require("netlify-identity-widget")

const IndexPage = () => {
  const user = netlifyIdentity.store.user
  let profileUrl
  if (user !== null) {
    profileUrl = `/app/profile/${user.id}`
    return profileUrl
  } else {
    profileUrl = `/app/profile/no-user`
  }
  return (
    <>
      <Seo title="Home" />
      <div>
        <h1>Hey {user ? user.user_metadata.full_name : "There!"}</h1>
        {user ? (
          <h2>
            Now that you're here, check out your{" "}
            <Link to={profileUrl}>profile!</Link>
          </h2>
        ) : (
          <h2>Knock knock, anyone there?</h2>
        )}
      </div>
    </>
  )
}

export default IndexPage

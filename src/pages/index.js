import React from "react"
import Seo from "../components/seo"
import { Signup } from "../services/Signup"
const netlifyIdentity =
  typeof window !== `undefined` ? require("netlify-identity-widget") : false

const IndexPage = () => {
  if (typeof window !== `undefined`) {
    console.log(netlifyIdentity.store.user)
  }
  return (
    <>
      <Seo title="Home" />
      <div>
        <h1>
          Hello{" "}
          {netlifyIdentity.store.user === null || `undefined`
            ? "User"
            : netlifyIdentity.store.user.user_metadata.full_name}
        </h1>
        <Signup />
        {netlifyIdentity.store.user === null || `undefined` ? (
          <h2>Knock knock, anyone there?</h2>
        ) : (
          <h2>Now that you're here. Check out your profile!</h2>
        )}
      </div>
    </>
  )
}

export default IndexPage

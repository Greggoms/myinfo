import React from "react"
import Seo from "../components/seo"
import { Signup } from "../services/Signup"
import netlifyIdentity from "netlify-identity-widget"
const isBrowser = typeof window !== "undefined"

const IndexPage = () => {
  isBrowser
    ? console.log(`isBrowser=True: `, netlifyIdentity.store.user)
    : console.log(`isBrowser=False: `, netlifyIdentity.store.user)
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

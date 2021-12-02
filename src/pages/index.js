import React from "react"
import Seo from "../components/seo"
import { Signup } from "../services/Signup"
const netlifyIdentity = require("netlify-identity-widget")

const IndexPage = () => {
  console.log(netlifyIdentity.store.user)
  return (
    <>
      <Seo title="Home" />
      <div>
        <h1>
          Hello{" "}
          {netlifyIdentity.store.user
            ? netlifyIdentity.store.user.user_metadata.full_name
            : "User"}
        </h1>
        <Signup />
        {netlifyIdentity.store.user !== null && (
          <ul>
            <li>someones here</li>
            {/* <li>Email: {netlifyIdentity.currentUser.email}</li>
            <li>ID: {netlifyIdentity.currentUser.id}</li>
            <li>
              Role(s): {netlifyIdentity.currentUser.app_metadata.roles.map(role => role)}
            </li>
            <li>Created: {netlifyIdentity.currentUser.created_at}</li>
            <li>Confirmation Sent: {netlifyIdentity.currentUser.confirmation_sent_at}</li>
            <li>Confirmed: {netlifyIdentity.currentUser.confirmation_sent_at}</li>
            <li>Last Updated: {netlifyIdentity.currentUser.updated_at}</li>
            <li>Signup Method: {netlifyIdentity.currentUser.currentUser_metadata.signupSource}</li>
            <li>Provider: {netlifyIdentity.currentUser.app_metadata.provider}</li> */}
          </ul>
        )}
      </div>
    </>
  )
}

export default IndexPage

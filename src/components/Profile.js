import React from "react"
import Seo from "./seo"
const netlifyIdentity = require("netlify-identity-widget")

export const Profile = () => {
  const user = netlifyIdentity.currentUser()
  return (
    <>
      <Seo title={`${user.user_metadata.full_name}'s Profile`} />
      <div>
        <h2>{user.user_metadata.full_name}'s Profile</h2>
        <p>Account Email: {user.email}</p>
        <p>ID: {user.id}</p>
        <p>Account Created: {user.created_at.slice(0, 10)}</p>
        <p>
          Confirmation Email Sent:{" "}
          {user.confirmation_sent_at
            ? user.confirmation_sent_at.slice(0, 10)
            : `Not sent?`}
        </p>
        <p>Email Confirmed: {user.confirmed_at.slice(0, 10)}</p>
        <p>
          Recovery email sent:{" "}
          {user.recovery_sent_at
            ? user.recovery_sent_at.slice(0, 10)
            : `No reset link sent.`}
        </p>
        <p>
          Role(s):{" "}
          {user.app_metadata.roles
            ? user.app_metadata.roles.map(role => role)
            : "No Role Set"}
        </p>
      </div>
    </>
  )
}

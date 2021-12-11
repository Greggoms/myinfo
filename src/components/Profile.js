import React from "react"
import Seo from "./seo"
const netlifyIdentity = require("netlify-identity-widget")

export const Profile = () => {
  const user = netlifyIdentity.currentUser()
  return (
    <>
      <Seo
        title={user ? `${user.user_metadata.full_name}'s Profile` : "Profile"}
      />
      <div
        style={{
          maxWidth: "960px",
          margin: "0 auto",
        }}
      >
        <h2>{user && user.user_metadata.full_name}'s Profile</h2>
        <p>Account Email: {user && user.email}</p>
        <p>ID: {user && user.id}</p>
        <p>Account Created: {user && user.created_at.slice(0, 10)}</p>
        <p>
          Confirmation Email Sent:{" "}
          {user && user.confirmation_sent_at
            ? user.confirmation_sent_at.slice(0, 10)
            : `Not sent? Thats a problem...`}
        </p>
        <p>Email Confirmed: {user && user.confirmed_at.slice(0, 10)}</p>
        <p>
          Recovery email sent:{" "}
          {user && user.recovery_sent_at
            ? user.recovery_sent_at.slice(0, 10)
            : `No reset link sent.`}
        </p>
        <p>
          Role(s):{" "}
          {user && user.app_metadata.roles
            ? user.app_metadata.roles.map(role => role)
            : "No Role Set"}
        </p>
      </div>
    </>
  )
}

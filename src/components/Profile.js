import React from "react"
const netlifyIdentity = require("netlify-identity-widget")

export const Profile = () => {
  const user = netlifyIdentity.store.user
  return (
    <div>
      <h2>{user.user_metadata.full_name}'s Profile</h2>
      <p>Account Email: {user.email}</p>
      <p>
        Role(s):{" "}
        {user.app_metadata.roles
          ? user.app_metadata.roles.map(role => role)
          : "No Role Set"}
      </p>
      <p>Account Created: {user.created_at.slice(0, 10)}</p>
      <p>Confirmation Email Sent: {user.confirmation_sent_at.slice(0, 10)}</p>
      <p>Email Confirmed: {user.confirmed_at.slice(0, 10)}</p>
      <p>ID: {user.id}</p>
    </div>
  )
}

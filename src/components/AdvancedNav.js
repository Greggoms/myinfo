import React from "react"
import { AdminNav } from "./AdminNav"
import { NormalNav } from "./NormalNav"
const netlifyIdentity = require("netlify-identity-widget")

export const AdvancedNav = () => {
  // My attempt to refresh the nav to show restricted links
  // only when a user is logged in.
  // Result: No crashing, but the update only occurs
  //         after a full page reload.

  const user = netlifyIdentity.currentUser()
  // eslint-disable-next-line
  return user ? (
    user.email === "rpggamer1337man@gmail.com" ? (
      <AdminNav />
    ) : (
      <NormalNav />
    )
  ) : (
    <NormalNav />
  )
}

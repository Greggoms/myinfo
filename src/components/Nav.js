import React, { useState, useEffect } from "react"
import { AdminNav } from "./AdminNav"
import { NormalNav } from "./NormalNav"
const netlifyIdentity = require("netlify-identity-widget")

export const Nav = () => {
  // My attempt to refresh the nav to show restricted links
  // only when a user is logged in.
  // Result: No crashing, but the update only occurs
  //         after a full page reload.

  const user = netlifyIdentity.currentUser()
  const [role, setRole] = useState(
    user ? user.app_metadata.roles.map(role => role) : ""
  )
  useEffect(() => {
    if (role == "Admin") {
      setRole("Admin")
    } else if (role == "Manager") {
      setRole("Manager")
    }
  }, [user, role])

  if (role === "Admin") {
    return <AdminNav />
  } else return <NormalNav />
}

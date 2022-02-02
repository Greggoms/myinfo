import React, { useState, useEffect } from "react"
import { AdminNav } from "./AdminNav"
import { NormalNav } from "./NormalNav"

export const AdvancedNav = () => {
  const user = netlifyIdentity.currentUser()
  const [role, setRole] = useState(
    user ? user.app_metadata.roles.map(role => role) : ""
  )
  useEffect(() => {
    // eslint-disable-next-line
    if (role == "Admin") {
      setRole("Admin")
      // eslint-disable-next-line
    } else if (role == "Manager") {
      setRole("Manager")
    } else {
      setRole("")
    }
  }, [user, role])
  if (role === "Admin") {
    return <AdminNav />
  } else return <NormalNav />
}

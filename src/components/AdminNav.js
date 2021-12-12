import React from "react"
import { Link } from "gatsby"
import { NavContainer } from "../elements"

export const AdminNav = () => {
  return (
    <NavContainer>
      <Link to="/app/profile">Profile</Link>
      <Link to="/app/dashboard">Dashboard</Link>
    </NavContainer>
  )
}

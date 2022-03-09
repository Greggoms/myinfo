import React from "react"
import { Link } from "gatsby"
import { NavContainer } from "../elements"

export const AdminNav = () => {
  return (
    <NavContainer>
      <Link to="/profile">Profile</Link>
      <Link to="/faq">FAQ</Link>
      <Link to="/dashboard">Dashboard</Link>
    </NavContainer>
  )
}

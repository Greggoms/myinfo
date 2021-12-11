import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

export const AdminNav = () => {
  return (
    <NavContainer>
      <Link to="/app/profile">Profile</Link>
      <Link to="/app/dashboard">Dashboard</Link>
    </NavContainer>
  )
}

const NavContainer = styled.nav`
  a:first-child {
    margin-right: 0.5rem;
  }
`

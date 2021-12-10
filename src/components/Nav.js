import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
const netlifyIdentity = require("netlify-identity-widget")

export const Nav = () => {
  const user = netlifyIdentity.store.user
  let profileUrl
  if (user !== null) {
    profileUrl = `/app/profile/${user.id}`
    return profileUrl
  } else {
    profileUrl = `/app/profile`
  }
  return (
    <>
      <NavContainer>
        <Link to={profileUrl}>Profile</Link>
        <Link to="/app/dashboard">Dashboard</Link>
      </NavContainer>
    </>
  )
}

const NavContainer = styled.nav`
  a:first-child {
    margin-right: 0.5rem;
  }
`

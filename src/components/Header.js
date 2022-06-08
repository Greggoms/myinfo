import React from "react"
import { Link } from "gatsby"
import { Nav } from "../components/Nav"
import { HeaderContainer } from "../css"

export const Header = ({ siteTitle }) => {
  return (
    <HeaderContainer className="page-container">
      <div className="page-content header-content">
        <h1>
          <Link to="/">{siteTitle}</Link>
        </h1>
        <Nav />
      </div>
    </HeaderContainer>
  )
}

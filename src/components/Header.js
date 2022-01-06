import React from "react"
import { Link } from "gatsby"
import { Nav } from "./Nav"
import { Signup } from "../services/Signup"
import { HeaderContainer, HeaderContents } from "../elements"

export const Header = ({ siteTitle }) => {
  return (
    <HeaderContainer id="top">
      <HeaderContents>
        <h1>
          <Link to="/">{siteTitle}</Link>
        </h1>
        <div className="navigation">
          <Signup />
          <Nav />
        </div>
      </HeaderContents>
    </HeaderContainer>
  )
}

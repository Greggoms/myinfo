import React, { useState } from "react"
import { Link } from "gatsby"
import { Nav } from "../components/Nav"
import { HeaderContainer } from "../css"

export const Header = ({ siteTitle }) => {
  const [hamburgerActive, setHamburgerActive] = useState(false)

  const mobileNavStyles = {
    active: {
      left: `50%`,
    },
    inactive: {
      left: `100%`,
    },
  }

  return (
    <>
      <HeaderContainer>
        <div className="header-content">
          <h1>
            <Link to="/">{siteTitle}</Link>
          </h1>
          {hamburgerActive && (
            <div
              className="overlay"
              onClick={() => setHamburgerActive(false)}
            />
          )}
          <div
            className={
              hamburgerActive
                ? `hamburger hamburger-active`
                : `hamburger hamburger-inactive`
            }
            onClick={() => setHamburgerActive(!hamburgerActive)}
          >
            <div className="line line-1" />
            <div className="line line-2" />
            <div className="line line-3" />
          </div>
          <Nav
            style={
              hamburgerActive
                ? mobileNavStyles.active
                : mobileNavStyles.inactive
            }
            closeNav={() => setHamburgerActive(false)}
            mobile={hamburgerActive}
          />
        </div>
      </HeaderContainer>
    </>
  )
}

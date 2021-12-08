import * as React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import styled from "styled-components"
import { Nav } from "./Nav"
import { Signup } from "../services/Signup"
const netlifyIdentity = require("netlify-identity-widget")

export const Header = ({ siteTitle }) => {
  const user = netlifyIdentity.store.user
  return (
    <HeaderContainer>
      <HeaderContents>
        <h1>
          <Link to="/">{siteTitle}</Link>
        </h1>
        <Signup />
        {user === null ? false : <Nav />}
      </HeaderContents>
    </HeaderContainer>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

const HeaderContainer = styled.header`
  background: #333;
  margin=bottom: 1.45rem;
`

const HeaderContents = styled.div`
  margin: 0 auto;
  max-width: 960px;
  padding: 1.45rem 1.0875rem;

  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  h1 {
    margin: 0;
    flex: 1;
  }

  a {
    color: white;
    text-decoration: none;
  }
`

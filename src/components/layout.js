import * as React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"

import { Header } from "./header"
import { Footer } from "./Footer"
import "./layout.css"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <LayoutContainer>
        <div className="content">
          <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
          <MainContainer>{children}</MainContainer>
        </div>
        <Footer />
      </LayoutContainer>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout

const MainContainer = styled.main`
  margin: 0 auto;
  padding: 0 1.0875rem;
`
const LayoutContainer = styled.div`
  /*///////////////////////////
  // Keeps footer at bottom. //
  ///////////////////////////*/

  display: flex;
  flex-direction: column;
  min-height: 100vh;

  .content {
    flex-grow: 1;
  }
  /*/////////////////////////*/
`

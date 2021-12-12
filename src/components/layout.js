import * as React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import { ClientOnly } from "../services/ClientOnly"
import { Header } from "./Header"
import { Footer } from "./Footer"
import { LayoutContainer, MainContainer } from "../elements"
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
    <ClientOnly>
      <LayoutContainer>
        <div className="content">
          <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
          <MainContainer>{children}</MainContainer>
        </div>
        <Footer />
      </LayoutContainer>
    </ClientOnly>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout

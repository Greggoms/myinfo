import React from "react"
import { FirebaseSignup } from "../services/FirebaseSignup"
import { ClientOnly } from "../services/ClientOnly"
import { Header } from "./Header"
import { Footer } from "./Footer"
import { LayoutContainer, MainContainer } from "../elements"
import "./layout.css"

const Layout = ({ children }) => {
  return (
    <ClientOnly>
      <LayoutContainer>
        <Header siteTitle="vwLogin" />
        <div className="content">
          <FirebaseSignup />
          <MainContainer>{children}</MainContainer>
        </div>
        <Footer />
      </LayoutContainer>
    </ClientOnly>
  )
}

export default Layout

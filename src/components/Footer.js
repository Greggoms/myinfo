import React from "react"
import { FooterContainer } from "../css"

export const Footer = () => {
  return (
    <FooterContainer>
      <div className="footer-content">
        Built with
        {` `}
        <a href="https://www.gatsbyjs.com">Gatsby</a> by Greggoms
      </div>
    </FooterContainer>
  )
}

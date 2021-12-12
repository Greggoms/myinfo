import React from "react"
import { FooterContainer, FooterContents } from "../elements"

export const Footer = () => {
  return (
    <FooterContainer>
      <FooterContents>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.com">Gatsby</a>
      </FooterContents>
    </FooterContainer>
  )
}

import React from "react"
import { FooterContainer, FooterContents } from "../elements"

export const Footer = () => {
  return (
    <FooterContainer>
      <FooterContents>
        Built with
        {` `}
        <a href="https://www.gatsbyjs.com">Gatsby</a> by Greggoms
      </FooterContents>
    </FooterContainer>
  )
}

import React from "react"
import styled from "styled-components"

export const Footer = () => {
  return (
    <FooterContainer
      style={{
        marginTop: `2rem`,
      }}
    >
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `1.45rem 1.0875rem`,
        }}
      >
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.com">Gatsby</a>
      </div>
    </FooterContainer>
  )
}

const FooterContainer = styled.footer`
  color: #f9f9f9;
  background: #333;

  a {
    color: #f9f9f9;
  }
`

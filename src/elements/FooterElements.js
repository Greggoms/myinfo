import styled from "styled-components"

export const FooterContainer = styled.footer`
  color: ${props => props.theme.grayscale.light1};
  background: #333;

  a {
    color: ${props => props.theme.grayscale.light1};
  }
`

export const FooterContents = styled.section`
  margin: 0 auto;
  max-width: 960px;
  padding: 1.45rem 1.0875rem;
`

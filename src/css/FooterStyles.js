import styled from "styled-components"

export const FooterContainer = styled.footer`
  background: #333;
  color: ${props => props.theme.grayscale.light1};
  padding: 1.45rem 1.0875rem;

  a {
    color: ${props => props.theme.grayscale.light1};
  }
`

import styled from "styled-components"

export const FooterContainer = styled.footer`
  background: #333;
  color: ${props => props.theme.grayscale.light1};

  .footer-content {
    padding: 15px;
    max-width: 1500px;
    margin: 0 auto;
    @media only screen and (min-width: 380px) {
      flex-direction: row;
    }
  }

  a {
    color: ${props => props.theme.grayscale.light1};
  }
`

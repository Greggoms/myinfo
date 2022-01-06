import styled from "styled-components"

export const NavContainer = styled.nav`
  @media only screen and (max-width: 600px) {
    width: 100%;
    display: flex;
    justify-content: flex-start;
  }
  a:first-child {
    margin-right: 1.5rem;
  }
`

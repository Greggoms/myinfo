import styled from "styled-components"

export const NavContainer = styled.nav`
  @media only screen and (max-width: 600px) {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  a:first-child {
    margin-right: 0.5rem;
  }
`

import styled from "styled-components"

export const NavContainer = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;

  @media ${props => props.theme.breakpoints.tablet} {
    justify-content: flex-end;
  }

  a:not(:last-child) {
    margin-right: 10px;
  }

  button {
    background: #f29e6f;
    border: 1.25px solid #ff454d;
    border-radius: 5px;
    color: ${props => props.theme.grayscale.dark4};
    cursor: pointer;
    padding: 5px;
    margin-left: 5px;
  }
`

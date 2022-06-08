import styled from "styled-components"

export const NavContainer = styled.nav`
  @media ${props => props.theme.breakpoints.mobile} {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
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
    margin-left: 30px;
  }
`

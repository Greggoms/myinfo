import styled from "styled-components"

export const NavContainer = styled.nav`
  transition: all 0.2s ease;

  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 10;

  display: flex;
  flex-direction: column;
  gap: 10px;

  background: ${props => props.theme.grayscale.light1};
  padding: 10px;

  @media ${props => props.theme.breakpoints.tablet} {
    flex-direction: row;
    align-items: center;

    position: static;
    background: inherit;
    padding: 0;
  }

  a {
    color: ${props => props.theme.grayscale.dark4};
    &:first-child {
      margin-top: 55px;
    }

    @media ${props => props.theme.breakpoints.tablet} {
      color: ${props => props.theme.grayscale.light1};
      &:first-child {
        margin-top: 0;
      }
    }
  }

  button {
    cursor: pointer;
    background: #f29e6f;
    border: 1.25px solid #ff454d;
    border-radius: 5px;
    color: ${props => props.theme.grayscale.dark4};
    padding: 5px;
  }
`

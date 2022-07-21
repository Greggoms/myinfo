import styled from "styled-components"

export const HeaderContainer = styled.header`
  background: ${props => props.theme.grayscale.dark4};

  .header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 15px;

    padding: 15px;
    max-width: 1500px;
    margin: 0 auto;

    @media ${props => props.theme.breakpoints.tablet} {
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
    }

    h1 {
      margin: 0;
      text-align: center;
      a {
        text-decoration: none;
        color: white;
      }
    }
  }

  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;

    background: rgba(55, 55, 55, 0.8);
    z-index: 9;

    @media ${props => props.theme.breakpoints.tablet} {
      display: none;
    }
  }

  .hamburger {
    display: grid;
    align-content: center;

    position: fixed;
    top: 10px;
    right: 15px;
    z-index: 100;

    width: 100%;
    max-width: 50px;
    height: 50px;
    cursor: pointer;
    padding: 10px;
    border-radius: 50%;

    @media ${props => props.theme.breakpoints.tablet} {
      display: none;
    }

    .line {
      height: 3px;
      width: 100%;
      transition: all 0.5s ease;
      transform-origin: center;
    }
  }

  .hamburger-active {
    background: ${props => props.theme.grayscale.light1};

    .line {
      background: ${props => props.theme.grayscale.dark4};
    }
    .line-1,
    .line-2,
    .line-3 {
      grid-column: 1;
      grid-row: 1;
    }
    .line-1 {
      transform: rotate(45deg);
    }
    .line-3 {
      transform: rotate(-45deg);
    }
    .line-2 {
      opacity: 0;
    }
  }

  .hamburger-inactive {
    gap: 5px;
    background: ${props => props.theme.grayscale.dark4};

    .line {
      background: ${props => props.theme.grayscale.light1};
    }
    .line-1 {
      transform: rotate(0);
    }
    .line-3 {
      transform: rotate(0);
    }
    .line-2 {
      opacity: 1;
    }
  }
`

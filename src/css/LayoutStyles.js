import styled from "styled-components"

export const LayoutContainer = styled.div`
  font-family: "Raleway", sans-serif;

  /* Keeps Footer at bottom */
  display: flex;
  flex-direction: column;
  height: 100vh;
  /*////////////////////////*/

  @media ${props => props.theme.breakpoints.tablet} {
    width: 95vw;
    max-width: 1800px;
  }

  max-width: 1500px;
  margin: 0 auto;

  main {
    padding: 10px;
  }

  /* to center the login form */
  /* main,
  #gatsby-focus-wrapper,
  #gatsby-focus-wrapper > div {
    height: 100%;
  } */

  .content {
    flex: 1;
    background: ${props => props.theme.grayscale.dark2};
  }

  /* https://stackoverflow.com/questions/2989263/disable-auto-zoom-in-input-text-tag-safari-on-iphone */
  /* lortschi answer */
  @supports (-webkit-overflow-scrolling: touch) {
    input,
    textarea {
      font-size: 16px;
    }
  }
`

export const MainContainer = styled.main`
  color: ${props => props.theme.grayscale.light1};
  padding: 10px;
`

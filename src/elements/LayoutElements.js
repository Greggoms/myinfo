import styled from "styled-components"

export const MainContainer = styled.main`
  padding: 0 1.0875rem;
  color: ${props => props.theme.grayscale.light1};
`
export const LayoutContainer = styled.div`
  /*///////////////////////////
  // Keeps footer at bottom. //
  ///////////////////////////*/

  /* display: flex;
  flex-direction: column; */

  display: grid;
  grid-template-columns: 1;
  grid-template-rows: min-content 1fr min-content;
  height: 100vh;

  .content {
    padding-top: 1.45rem;
    background: ${props => props.theme.grayscale.dark2};
  }

  .footer {
  }
  /*/////////////////////////*/
`

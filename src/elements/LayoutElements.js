import styled from "styled-components"

export const MainContainer = styled.main`
  margin: 0 auto;
  margin-top: 1.45rem;
  padding: 0 1.0875rem;
  color: ${props => props.theme.grayscale.light1};
`
export const LayoutContainer = styled.div`
  /*///////////////////////////
  // Keeps footer at bottom. //
  ///////////////////////////*/

  display: flex;
  flex-direction: column;
  height: 100vh;

  .content {
    flex: 1;
    background: ${props => props.theme.grayscale.dark2};
  }
  /*/////////////////////////*/
`

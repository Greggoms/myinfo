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

  background: ${props => props.theme.grayscale.dark2};
  min-height: 100vh; /* will cover the 100% of viewport */
  overflow: hidden;
  display: block;
  position: relative;
  padding-bottom: 65px; /* height of your footer */

  /*/ ////////////////////////*/
`

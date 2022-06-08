import styled from "styled-components"

export const LayoutContainer = styled.div`
  /* Keeps Footer at bottom */
  display: flex;
  flex-direction: column;
  height: 100vh;
  /*////////////////////////*/

  .content {
    flex: 1;
    background: ${props => props.theme.grayscale.dark2};
  }
`

export const MainContainer = styled.main`
  color: ${props => props.theme.grayscale.light1};
  margin: 20px 0 50px 0;
`

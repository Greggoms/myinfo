import styled from "styled-components"

export const HeaderContainer = styled.header`
  background: ${props => props.theme.grayscale.dark4};
`

export const HeaderContents = styled.div`
  margin: 0 auto;
  max-width: 960px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 70px min-content 65px;
  justify-items: center;
  align-items: center;
  grid-row-gap: 10px;
}

  @media only screen and (max-width: 1000px) {
    margin: 0;
    max-width: 100vw;
  }

  @media only screen and (max-width: 600px) {
    margin: 0;
  }
  
  @media only screen and (min-width: 500px) {
    grid-template-rows: 70px 65px;
    align-items: flex-end;
  }
  @media only screen and (min-width: 800px) {
     grid-template-rows: 70px 20px;
     grid-template-columns: 1fr 2fr 2fr;
    }
  
  h1 {
    margin: 0;
    grid-column: 1 / -1;
    grid-row: 1;
    align-self: flex-end;
 

    @media only screen and (min-width: 500px) {
      grid-column: 1;
    }
  }

  a {
    color: white;
    text-decoration: none;
  }

  .navigation {
    grid-column: 1 / -1;
    grid-row: 3;

    @media only screen and (min-width: 500px) {
      grid-column: 1/-1;
      grid-row: 2;
      align-self: center;
    }
    
    @media only screen and (min-width: 800px) {
      grid-column: 3;
      grid-row: 1;
      align-self: flex-end;
    }
  }
`

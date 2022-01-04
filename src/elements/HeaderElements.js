import styled from "styled-components"

export const HeaderContainer = styled.header`
  background: ${props => props.theme.grayscale.dark4};
  margin-bottom: 1.45rem;
`

export const HeaderContents = styled.div`
  margin: 0 auto;
  max-width: 960px;
  padding: 1.45rem 1.0875rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  @media only screen and (max-width: 600px) {
    align-items: center;
  }

  h1 {
    margin: 0;
    flex: 1;
  }

  a {
    color: white;
    text-decoration: none;
  }

  .navigation {
    flex: 1;
    display: flex;
    @media only screen and (max-width: 600px) {
      flex-direction: column;
      align-items: center;
    }
  }
`

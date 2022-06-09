import styled from "styled-components"

export const HeaderContainer = styled.header`
  background: ${props => props.theme.grayscale.dark4};

  .header-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;

    padding: 15px;
    max-width: 1500px;
    margin: 0 auto;

    @media ${props => props.theme.breakpoints.tablet} {
      flex-direction: row;
      align-items: flex-end;
      justify-content: space-between;
    }

    h1 {
      margin: 0;
      a {
        text-decoration: none;
      }
    }

    a {
      color: white;
    }
  }
`

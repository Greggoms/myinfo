import styled from "styled-components"

export const HeaderContainer = styled.header`
  background: ${props => props.theme.grayscale.dark4};

  .header-content {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;

    padding: 10px 0;

    @media ${props => props.theme.breakpoints.mobile} {
      flex-direction: column;
      align-items: center;
      gap: 15px;
      align-content: flex-end;
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

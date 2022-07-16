import styled from "styled-components"

export const UserDetailsContainer = styled.section`
  h2 {
    text-align: center;
  }
  .nothing-to-see {
    h2 {
      font-weight: 200;
    }
  }

  .action-needed {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 25px;

    width: 100%;
    max-width: 800px;
    margin: 20px auto;

    > div {
      padding: 10px;
    }

    h3 {
      margin-bottom: 5px;
    }

    ul {
      margin-left: 15px;
    }

    li:not(:last-child) {
      margin-bottom: 20px;
    }

    .request {
      span {
        font-size: 9pt;
        color: ${props => props.theme.grayscale.light2};
      }
      @media ${props => props.theme.breakpoints.tablet} {
        display: flex;
        gap: 10px;
        align-items: baseline;
      }
    }

    &__submitted {
      border: 2px solid ${props => props.theme.colors.green};
    }
    &__review {
      border: 2px solid ${props => props.theme.colors.yellow};
    }
  }

  .approve,
  .deny {
    margin-top: 5px;
    cursor: pointer;
  }

  .approve {
    padding: 5px;
    border: 2px solid ${props => props.theme.colors.green};
    background: ${props => props.theme.grayscale.light1};
  }

  .deny {
    background: inherit;
    border: none;
    border-bottom: 1px solid ${props => props.theme.colors.red};
    color: ${props => props.theme.grayscale.light1};
  }

  button:not(:last-child) {
    margin-right: 30px;
  }
`

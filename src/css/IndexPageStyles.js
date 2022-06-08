import styled from "styled-components"

export const IndexPageContainer = styled.div`
  h2 {
    text-align: center;
    margin-bottom: 20px;
  }

  .ctas {
    display: grid;
    grid-template-columns: 1fr 1fr;
    justify-items: center;
    gap: 20px;

    max-width: 900px;
    margin: 0 auto;
  }

  .cta {
    min-width: 200px;
    width: 100%;
    max-width: 400px;

    background: ${props => props.theme.grayscale.dark3};
    border: 1.25px solid ${props => props.theme.colors.link};
    border-radius: 5px;
    padding: 10px;

    h2 {
      margin-bottom: 10px;
    }

    ul li {
      margin-left: 20px;
    }

    &-special {
      grid-column: 1 / -1;

      background: ${props => props.theme.grayscale.light4};
      border: 3.5px dashed ${props => props.theme.grayscale.dark3};
    }
  }
`

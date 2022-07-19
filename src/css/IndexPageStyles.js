import styled from "styled-components"

export const IndexPageContainer = styled.div`
  .paystub-info {
    display: flex;
    align-items: center;
    gap: 8px;

    background: ${props => props.theme.grayscale.light1};
    color: ${props => props.theme.grayscale.dark4};
    padding: 8px;
    width: fit-content;
    margin: 0 auto 10px;
    a {
      color: ${props => props.theme.colors.linkDark};
    }
  }

  .ctas {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    justify-items: center;
    align-content: space-between;
    gap: 20px;

    max-width: 900px;
    margin: 0 auto;
  }

  .cta {
    display: flex;
    flex-direction: column;
    gap: 10px;

    min-width: 200px;
    width: 100%;
    max-width: 400px;

    background: ${props => props.theme.grayscale.dark3};
    border: 1.25px solid ${props => props.theme.colors.link};
    border-radius: 5px;
    padding: 10px;

    h2 {
      text-align: center;
      margin-bottom: 0;
    }

    ul {
      flex: 1;
    }

    ul li {
      margin-left: 20px;
    }

    button {
      align-self: center;
    }

    &-special {
      grid-column: 1 / -1;

      background: ${props => props.theme.grayscale.light4};
      border: 3.5px dashed ${props => props.theme.grayscale.dark3};
    }
  }
`

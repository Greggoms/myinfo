import styled from "styled-components"

export const DashboardProfilesContainer = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));
  grid-template-rows: min-content auto;
  align-items: flex-start;
  justify-content: center;
  grid-gap: 2rem;
  background: ${props => props.theme.grayscale.dark2};

  #searchbar {
    justify-self: center;
    grid-row: 1;
    grid-column: 1 / -1;

    width: 100%;
    max-width: 500px;
    padding: 5px;
  }

  .nomatch {
    justify-self: center;
    grid-row: 2;
    grid-column: 1 / -1;
  }
`

export const DashboardProfileContainer = styled.section`
  background: ${props => props.theme.grayscale.dark3};
  padding: 1.5rem;

  .basic-info {
    line-height: 24px;
  }

  .pending {
    text-decoration: underline;
    text-decoration-color: ${props => props.theme.colors.purple};
  }
  .accepted {
    margin-top: 0.5rem;
    text-decoration: underline;
    text-decoration-color: ${props => props.theme.colors.green};
  }

  .request-details {
    margin-top: 2rem;
  }

  .p {
    margin: 10px 0;
  }

  ul {
    margin-left: 2rem;

    li {
      margin: 0.5rem 0;
    }
  }

  hr {
    border-top: 2px solid ${props => props.theme.colors.link};
    width: 40%;
    margin: 0.5rem 0;
  }

  .update-pay {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
  }

  button {
    border: 2px solid ${props => props.theme.colors.link};
    background: inherit;
    color: ${props => props.theme.grayscale.light1};
    padding: 2px 5px;
    margin-top: 20px;
    cursor: pointer;
  }

  button:disabled {
    border: 2px solid ${props => props.theme.grayscale.dark2};
    color: ${props => props.theme.grayscale.light4};
    cursor: not-allowed;
  }
`

import styled from "styled-components"

export const DashboardProfilesContainer = styled.section`
  grid-column: 1;
  grid-row: 1;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));
  grid-gap: 2rem;

  background: ${props => props.theme.grayscale.dark2};
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
    margin: 2rem 0 0;
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
`

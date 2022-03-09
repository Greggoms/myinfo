import styled from "styled-components"

export const DashboardPageContainer = styled.div`
  grid-column: 2 / span 6;
  @media ${props => props.theme.breakpoints.mobile} {
    grid-column: 2 / 3;
  }
`
export const DashboardPageErrorContainer = styled.div`
  grid-column: 2 / span 6;
  @media ${props => props.theme.breakpoints.mobile} {
    grid-column: 2 / 3;
  }
`
export const EmployeeViewContainer = styled.section`
  .selected-component {
    display: grid;
    grid-template-columns: 1fr 0;
    grid-template-rows: 1fr 0;
  }
  .button-container {
    margin: 0 auto;
    margin-bottom: 3rem;
    display: flex;
    flex-wrap: wrap;
    grid-gap: 15px;
    max-width: 40rem;

    button {
      border: none;
      color: ${props => props.theme.grayscale.light2};
      background: ${props => props.theme.grayscale.dark1};
      padding: 0.2rem 0.6rem;
      font-size: 22pt;
      border-radius: 0.5rem;
      cursor: pointer;
    }
  }
`

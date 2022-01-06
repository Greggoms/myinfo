import styled from "styled-components"

export const DashboardPageContainer = styled.div`
  margin: 0 auto;
  margin-bottom: 3rem;
  max-width: 100rem;
  transition: all 3s ease;
`
export const DashboardPageErrorContainer = styled.div`
  margin: 0 auto;
  max-width: 960px;
`
export const EmployeeViewContainer = styled.section`
  .selected-component {
    display: grid;
    grid-template-columns: 1fr 0;
    grid-template-rows: 1fr 0;
    transition: all 30s ease;
  }
  .button-container {
    margin: 0 auto;
    margin-bottom: 3rem;
    display: flex;
    justify-content: space-between;
    max-width: 25rem;

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

import styled from "styled-components"

export const AdminButtonsContainer = styled.div`
  margin-bottom: 20px;

  h3 {
    margin-bottom: 5px;
  }

  button {
    display: flex;
    flex-direction: column;
    justify-content: center;

    border: none;
    cursor: pointer;

    svg {
      flex: 1;
    }
  }

  .views {
    display: flex;
    gap: 20px;

    button {
      padding: 10px 15px;
    }
  }

  .details {
    display: flex;
    gap: 20px;

    button {
      padding: 6px 11px;
    }
  }

  .filters {
    display: flex;
    gap: 20px;

    button {
      color: ${props => props.theme.grayscale.light1};
      background: inherit;
      text-decoration: underline;
    }
  }

  .filter-heading {
    display: flex;
    align-items: baseline;
    gap: 10px;
  }
`

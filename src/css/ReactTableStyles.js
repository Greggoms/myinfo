import styled from "styled-components"

export const TableContainer = styled.table`
  width: 100%;
  max-width: 105rem;
  margin: 0 auto;

  tbody tr:nth-child(odd) {
    background: ${props => props.theme.grayscale.dark1};
  }

  tbody tr:nth-child(even) {
    background: ${props => props.theme.grayscale.dark2};
  }

  tbody tr {
    font-weight: 700;
  }

  th {
    cursor: pointer;
    background: ${props => props.theme.grayscale.dark3};
    border-top: 1px solid ${props => props.theme.grayscale.dark4};
    border-left: 1px solid ${props => props.theme.grayscale.dark4};
  }

  th:last-child {
    border-right: 1px solid ${props => props.theme.grayscale.dark4};
  }

  th,
  td {
    padding: 0.5rem !important;
  }
`
export const TableToggleContainer = styled.div`
  margin: 20px auto;

  h3 {
    margin-bottom: 5px;
    font-size: 20pt;
    font-weight: 200;
  }
  .label-list {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }

  .toggle-all {
    border: 2px solid ${props => props.theme.grayscale.light1};
  }

  label {
    display: grid;
    justify-content: flex-start;

    cursor: pointer;
    padding: 8px;

    border-radius: 5px;
  }

  input,
  p {
    grid-column: 1;
    grid-row: 1;
  }
  p {
    z-index: 1;
    background: ${props => props.theme.grayscale.dark2};
  }
`

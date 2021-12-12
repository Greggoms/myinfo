import styled from "styled-components"

export const TableContainer = styled.table`
  width: 100%;
  max-width: 105rem;
  margin: 3rem auto;

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
    background: ${props => props.theme.grayscale.dark3};
    border-top: 1px solid ${props => props.theme.grayscale.dark4};
    border-left: 1px solid ${props => props.theme.grayscale.dark4};
  }

  th:last-child {
    border-right: 1px solid ${props => props.theme.grayscale.dark4};
  }

  th,
  td {
    padding: 0.5rem 1.5rem !important;
  }
`

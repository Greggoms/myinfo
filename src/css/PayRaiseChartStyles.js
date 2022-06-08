import styled from "styled-components"

export const PayRaiseChartContainer = styled.section`
  overflow: hidden;

  .position-select {
    text-align: center;
    margin: 1rem 0;
  }

  .month-header {
    grid-row: 1;
    grid-column: 1;
    margin-bottom: 10px;
  }

  .amount-header {
    grid-row: 1;
    grid-column: 2;
  }
  .month-amount {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: min-content repeat(9, min-content);
    grid-column-gap: 30px;
    text-align: center;

    > div {
      justify-self: center;
      width: 100%;
      max-width: 140px;

      display: flex;
      justify-content: space-between;
      margin-bottom: 0.5rem;
      grid-column: 1 /-1;

      p:nth-child(even) {
        text-align: left;
      }
    }
    .active {
      border: 2px solid yellow;
      padding: 12px 8px;
      max-width: 160px;
    }
    .inactive {
      border-bottom: 1px dashed ${props => props.theme.grayscale.light1};
    }
  }
`

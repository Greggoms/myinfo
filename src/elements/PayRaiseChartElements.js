import styled from "styled-components"

export const PayRaiseChartContainer = styled.section`
  overflow: hidden;

  .position-select {
    text-align: center;
    margin: 1rem 0;
  }
  .pay-guide {
  }

  h3:first-child {
    grid-column: 1;
    justify-self: flex-end;
    margin-bottom: 0.5rem;
  }

  h3:nth-child(even) {
    grid-column: 2;
  }

  .month-amount {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: min-content repeat(9, min-content);
    grid-column-gap: 90px;

    > div {
      justify-self: center;
      width: 100%;

      display: flex;
      justify-content: space-between;
      max-width: 170px;
      margin-bottom: 0.5rem;
      grid-column: 1 /-1;

      p:nth-child(even) {
        text-align: left;
      }
    }
    .active {
      border: 2px solid yellow;
      padding: 12px 8px;
      max-width: 190px;
    }
    .inactive {
      border-bottom: 1px dashed ${props => props.theme.grayscale.light1};
    }
  }
`

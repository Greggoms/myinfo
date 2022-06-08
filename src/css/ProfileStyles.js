import styled from "styled-components"

export const ProfileContainer = styled.section`
  display: grid;
  grid-template-columns: max-content 1fr;
  gap: 30px;

  svg {
    font-size: 16pt;
    width: 20px;
  }

  aside {
    grid-column: 1;

    display: flex;
    flex-direction: column;
    gap: 10px;

    background: ${props => props.theme.grayscale.dark1};
    padding: 10px 20px;
    align-self: flex-start;

    h2 {
      text-align: center;
    }
  }

  .stats {
    grid-column: 1;

    h2 {
      text-align: left;
    }
  }

  section {
    display: flex;
    flex-direction: column;
    gap: 30px;

    .info {
      padding: 10px 20px;

      &-badge {
        background: ${props => props.theme.grayscale.light1};
        color: ${props => props.theme.grayscale.dark4};
        text-align: center;
        width: 100%;
        min-width: 200px;
        max-width: 350px;
      }
    }

    .spacer {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    span {
      font-size: 9pt;
    }
  }

  .info {
    display: flex;
    align-items: center;
    column-gap: 20px;

    &-container {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    &-long {
      background: ${props => props.theme.grayscale.dark3};
    }
  }

  .info-pto {
    grid-column: 2;
    grid-row: 1;

    display: flex;
    flex-direction: row;
    justify-content: center;

    .info {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-content: space-around;
      row-gap: 10px;
    }
  }

  .info-account {
    grid-column: 2;
  }

  .info-pto-usage {
    grid-column: 1/-1;
  }

  .requests-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: flex-start;
  }

  .request {
    background: ${props => props.theme.grayscale.dark4};
    padding: 10px;

    h2 {
      color: ${props => props.theme.grayscale.light1};
      margin-bottom: 10px;
    }

    ul li {
      margin-left: 20px;
    }
  }

  hr {
    margin: 0;
    margin-bottom: 10px;
    border-top: 1px solid ${props => props.theme.grayscale.light1};

    &.flexed {
      margin: 0;
    }
  }
`

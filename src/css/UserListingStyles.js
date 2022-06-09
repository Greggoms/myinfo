import styled from "styled-components"

export const DetailedUsersContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 10px;

  .user {
    display: flex;
    flex-direction: column;
    gap: 5px;

    background-color: ${props => props.theme.grayscale.dark4};
    padding: 10px 20px;

    &-general {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
      gap: 10px;

      text-align: center;
    }

    &-employment {
      display: flex;
      flex-direction: column;
      gap: 5px;

      &-dates {
        align-self: center;
        display: flex;
        flex-direction: column;
        gap: 15px;
      }
      span {
        font-size: 10pt;
      }
    }

    .item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 5px;
    }

    .pto-numbers {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 8px;

      text-align: center;
    }

    .requests {
      display: flex;
      flex-direction: column;
      gap: 10px;

      h4,
      h5 {
        text-align: center;
      }

      ul li {
        margin-left: 20px;
      }

      details {
        border: 1px solid #aaa;
        border-radius: 4px;
        padding: 0.5em 0.5em 0;
        cursor: pointer;
      }

      summary {
        font-weight: bold;
        margin: -0.5em -0.5em 0;
        padding: 0.5em;
      }

      details[open] {
        padding: 0.5em;
      }

      details[open] summary {
        border-bottom: 1px solid green;
        margin-bottom: 0.5em;
      }
    }

    .action-buttons {
      display: flex;
      justify-content: space-around;
      margin: 30px 0 15px 0;
    }

    svg {
      font-size: 26pt;
    }
  }

  .loading {
    text-align: center;
  }

  hr {
    margin: 10px 0;
    border-top: 1px solid ${props => props.theme.grayscale.light1};

    &.dashboard-hr {
      border-top: 2px solid ${props => props.theme.colors.link};
      width: 80%;
      margin: 10px auto;
    }
  }
`

export const MinimalDetailsContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 10px;

  .user {
    display: flex;
    flex-direction: column;
    gap: 20px;

    background: ${props => props.theme.grayscale.dark3};
    padding: 10px;

    span {
      font-size: 10pt;
    }
  }

  .action-buttons {
    display: flex;
    justify-content: space-around;
  }

  .request {
    ul li {
      margin-left: 20px;
    }

    details {
      border: 1px solid #aaa;
      border-radius: 4px;
      padding: 0.5em 0.5em 0;
      cursor: pointer;
    }

    summary {
      font-weight: bold;
      margin: -0.5em -0.5em 0;
      padding: 0.5em;
    }

    details[open] {
      padding: 0.5em;
    }

    details[open] summary {
      border-bottom: 1px solid green;
      margin-bottom: 0.5em;
    }
  }
`

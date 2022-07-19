import styled from "styled-components"

export const DetailedUsersContainer = styled.section`
  .userListForm {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;

    .grid {
      display: grid;
      width: 100%;
      height: 100vh;
    }
    .main {
      z-index: 1;
      grid-column: 1;
      grid-row: 1;

      display: flex;
      flex-direction: column;
      justify-content: center;
      align-self: center;
      justify-self: center;

      width: fit-content;
      height: fit-content;
      background: ${props => props.theme.grayscale.dark4};
      padding: 20px;

      h3 {
        margin-bottom: 10px;
        text-align: center;
      }
    }
    .overlay {
      grid-column: 1;
      grid-row: 1;
      width: 100%;
      height: 100%;
      background: rgba(80, 80, 80, 0.5);
    }
  }

  .guide {
    display: flex;
    flex-direction: column;
    gap: 5px;

    width: fit-content;
    margin: 20px auto;

    .label {
      display: flex;
      align-items: center;
      gap: 5px;
    }
  }

  .list {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;

    @media ${props => props.theme.breakpoints.tablet} {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(470px, 1fr));
      align-items: stretch;
      justify-items: center;
    }
  }

  .user {
    display: flex;
    flex-direction: column;
    gap: 5px;

    width: 100%;
    max-width: 470px;

    background-color: ${props => props.theme.grayscale.dark4};
    padding: 10px 20px;

    &-general {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(20%, 1fr));
      gap: 10px;

      text-align: center;

      @media only screen and (max-width: 414px) {
        grid-template-columns: repeat(auto-fit, minmax(40%, 1fr));
      }
    }

    &-employment {
      display: flex;
      flex-direction: column;
      gap: 5px;

      &-dates {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        column-gap: 30px;
        row-gap: 15px;

        /* @media only screen and (min-width: 25rem) { */
        /* @media ${props => props.theme.breakpoints.tablet} {
          flex-direction: row;
          align-items: flex-start;
          justify-items: center;
          justify-content: space-around;
        } */
      }
      span {
        font-size: 9pt;
        color: ${props => props.theme.grayscale.light2};
      }
    }
  }

  .heading {
    display: flex;
    justify-content: space-between;
  }

  h3 {
    a {
      color: ${props => props.theme.colors.link};
    }
    a:visited {
      color: ${props => props.theme.colors.linkLight};
    }
  }

  .dots {
    display: flex;
    gap: 5px;

    &__dot {
      width: 25px;
      height: 25px;
      border-radius: 50%;
    }
  }
  .green {
    background: ${props => props.theme.colors.green};
  }
  .yellow {
    background: ${props => props.theme.colors.yellow};
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

    span {
      font-size: 9pt;
      color: ${props => props.theme.grayscale.light2};
    }

    details {
      border: 1px solid #aaa;
      border-radius: 4px;
      padding: 0.5em 0.5em 0;
    }

    summary {
      cursor: pointer;
      text-align: center;
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

    .modify-button {
      cursor: pointer;
      background: ${props => props.theme.grayscale.light1};
      border: 2px solid ${props => props.theme.colors.link};
      width: 100%;
      max-width: 150px;
      padding: 8px;
    }
  }

  .manage-request {
    display: flex;
    flex-direction: column;

    .approve,
    .deny {
      margin-top: 5px;
      cursor: pointer;
    }

    .approve {
      padding: 5px;
      border: 2px solid ${props => props.theme.colors.green};
      background: ${props => props.theme.grayscale.light1};
    }

    .deny {
      background: inherit;
      border: none;
      border-bottom: 1px solid ${props => props.theme.colors.red};
      color: ${props => props.theme.grayscale.light1};
    }

    button:not(:last-child) {
      margin-right: 30px;
    }
  }

  svg {
    font-size: 26pt;
  }

  .loading {
    text-align: center;
  }

  hr {
    margin: 10px 0;
    border-top: 1px solid ${props => props.theme.grayscale.light1};

    &.admin-hr {
      border-top: 2px solid ${props => props.theme.colors.link};
      width: 80%;
      margin: 10px auto;
    }
  }
`

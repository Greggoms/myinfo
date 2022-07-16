import styled from "styled-components"

export const PtoRequestFormContainer = styled.section`
  /*
  Moving this to /css/ProfileStyles.js 
  inside the ProfileContainer.
  
  grid-area: ptoRequestForm;
  */

  display: flex;
  flex-direction: column;
  gap: 10px;

  width: 100%;
  max-width: 300px;

  .form-heading {
    display: flex;
    gap: 6px;
    align-items: center;

    svg {
      cursor: pointer;
    }
  }

  .dates {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 10px;
  }

  .radios {
    display: flex;
    flex-direction: column;
    gap: 5px;

    label {
      display: flex;
      cursor: pointer;
    }

    input {
      margin-right: 5px;
    }
    span {
      color: ${props => props.theme.grayscale.light1};
    }
    p {
      font-size: 10pt;
    }
  }

  .form-help {
    position: fixed;
    top: 0;
    left: 0;
    display: grid;
    align-items: center;
    height: 100%;
    width: 100%;
    overflow-y: scroll;

    button {
      align-self: center;

      border-radius: 50%;
      width: 35px;
      height: 35px;
      background: inherit;
      padding: 5px;
      border: 2px solid ${props => props.theme.grayscale.light1};
      color: ${props => props.theme.grayscale.light1};
      cursor: pointer;
      margin: 10px auto;
    }

    .help {
      z-index: 1;
      grid-column: 1;
      grid-row: 1;
      justify-self: center;

      display: flex;
      flex-direction: column;

      height: fit-content;
      width: fit-content;
      max-width: 500px;
      padding: 0 10px 10px;
      background: ${props => props.theme.grayscale.dark1};

      h2 {
        margin-bottom: 10px;
        text-align: center;
      }
    }
    .overlay {
      grid-column: 1;
      grid-row: 1;
      height: 100%;
      width: 100%;
      background: rgba(33, 33, 33, 0.8);
    }

    ul {
      margin-left: 15px;
    }
  }

  .label {
    display: flex;
    flex-direction: column;

    span {
      margin-bottom: 3px;
    }
  }

  .react-daterange-picker {
    width: fit-content;
    input {
      color: ${props => props.theme.grayscale.light1};
    }
  }

  .hour {
    &-container {
      width: 100%;
      border: 2px solid ${props => props.theme.grayscale.light1};
      padding: 5px;
      text-align: center;

      p {
        margin-bottom: 5px;
        font-size: 24pt;
      }
    }
    &-buttons {
      display: flex;

      button {
        flex: 1;
        cursor: pointer;
        width: fit-content;
        font-size: 16pt;
      }
    }
  }

  .request-buttons {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .reset {
      background: inherit;
      border: none;
      color: ${props => props.theme.grayscale.light1};
      text-decoration: underline;
      cursor: pointer;
    }
  }

  button[type="submit"] {
    cursor: pointer;
    border: 2px solid ${props => props.theme.colors.link};
    background: ${props => props.theme.grayscale.light1};
    color: ${props => props.theme.grayscale.dark4};

    width: fit-content;
    padding: 10px;
  }
`

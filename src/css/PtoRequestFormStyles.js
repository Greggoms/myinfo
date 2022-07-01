import styled from "styled-components"

export const PtoRequestFormContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 10px;

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
      max-width: 80px;
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
        width: fit-content;
        font-size: 16pt;
      }
    }
  }

  button[type="submit"] {
    width: fit-content;
    padding: 10px;
    background: ${props => props.theme.grayscale.light1};
    border: 2px solid ${props => props.theme.colors.link};
    cursor: pointer;
  }
`

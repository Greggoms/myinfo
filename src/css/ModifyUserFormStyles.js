import styled from "styled-components"

export const ModifyUserContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  /* overflow-y: scroll; */

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
  }
  .overlay {
    grid-column: 1;
    grid-row: 1;
    width: 100%;
    height: 100%;
    background: rgba(80, 80, 80, 0.5);
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .modify-close {
    cursor: pointer;
    background: inherit;
    border: none;
    text-decoration: underline;
    color: ${props => props.theme.grayscale.light1};
    margin-top: 20px;
  }

  h2 {
    text-align: center;
    margin-bottom: 15px;
  }
  span {
    font-size: 10pt;
  }
  label {
    display: flex;
    flex-direction: column;
    width: fit-content;
  }
  .label:not(:last-child) {
    margin-bottom: 10px;
  }
  .react-date-picker__inputGroup input {
    color: #fff;
  }
  .react-date-picker__calendar-button svg {
    stroke: ${props => props.theme.colors.link};
  }

  .submit-btn {
    margin-top: 30px;
    padding: 5px;
    border: 2px solid ${props => props.theme.colors.link};
    width: 100%;
  }
`

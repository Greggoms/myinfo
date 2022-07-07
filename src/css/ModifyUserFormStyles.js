import styled from "styled-components"

export const ModifyUserContainer = styled.div`
  width: fit-content;
  margin: 0 auto;

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

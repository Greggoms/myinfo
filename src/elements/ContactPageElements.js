import styled from "styled-components"

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  grid-gap: 20px;
  margin: 0 auto;
  max-width: 500px;

  .form-section {
    display: flex;
    flex-direction: column;
  }

  p {
    margin-bottom: 5px;
  }

  select {
    align-self: flex-start;
    margin-bottom: 20px;
  }

  .input-name,
  .input-email,
  .input-subject {
    max-width: 300px;
    padding-left: 5px;
  }

  .input-message {
    min-height: 30px;
    min-width: 285px;
    max-width: 650px;
    padding-left: 5px;
  }

  .submit-btn {
    cursor: pointer;
    background: inherit;
    border: 2px solid ${props => props.theme.colors.link};
    width: 150px;
    padding: 5px 10px;
    color: ${props => props.theme.grayscale.light1};
  }

  .error-message {
    color: #fa836e;
  }
`

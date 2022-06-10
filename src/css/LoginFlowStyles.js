import styled from "styled-components"

export const LoginPageWrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  /* to center the login form */
  height: 100%;

  .login-flow-content {
    width: 100%;
    max-width: 800px;
    min-height: 250px;
    background: linear-gradient(
        217deg,
        rgba(191, 191, 191, 0.8),
        rgba(255, 0, 0, 0) 70.71%
      ),
      linear-gradient(127deg, rgba(89, 88, 86, 0.8), rgba(0, 255, 0, 0) 70.71%),
      linear-gradient(
        336deg,
        rgba(115, 114, 111, 0.8),
        rgba(0, 0, 255, 0) 70.71%
      );
  }

  .form-select-buttons {
    display: grid;
    grid-template-columns: repeat(3, 1fr);

    height: 50px;

    button {
      background: none;
      font-size: 16pt;
      border: none;
      cursor: pointer;
    }

    .register {
      border-left: 1px solid ${props => props.theme.grayscale.dark4};
      border-right: 1px solid ${props => props.theme.grayscale.dark4};
    }
  }
`
export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0 20px 20px;

  label {
    display: flex;
    flex-direction: column;

    span {
      font-size: 10pt;
    }
  }

  h3 {
    margin: 0;
    margin-top: 15px;
  }

  button {
    align-self: center;

    cursor: pointer;
    border: 3px solid ${props => props.theme.colors.link};
    padding: 10px 15px;
  }
`

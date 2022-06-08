import styled from "styled-components"

export const LoginPageWrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  height: calc(100vh - 400px);

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
  }
`
export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;

  margin: 0 auto;

  h3 {
    margin: 0;
    margin-top: 15px;
  }
`

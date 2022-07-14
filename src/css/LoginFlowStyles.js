import styled from "styled-components"

export const LoginPageWrapper = styled.section`
  /* to center the login form */
  /* height: 100%; */

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
  width: 100%;
  max-width: 500px;
  margin: 0 auto;

  h2 {
    font-size: 26pt;
    font-weight: 200;
  }

  label {
    display: flex;
    flex-direction: column;

    span {
      font-size: 10pt;
    }
  }

  input {
    padding: 4px;
  }

  button {
    align-self: flex-start;

    cursor: pointer;
    border: 3px solid ${props => props.theme.colors.link};
    padding: 10px 15px;
  }

  hr {
    margin: 15px 0;
    border: none;
    border: 1px solid ${props => props.theme.grayscale.light1};
  }

  .form-nav {
    display: flex;
    gap: 50px;

    button {
      padding: 0;
      background: inherit;
      border: none;
      color: ${props => props.theme.colors.linkLight};
    }

    .label {
      display: flex;
      flex-direction: column;
    }
  }
`

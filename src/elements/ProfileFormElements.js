import styled from "styled-components"

export const ProfileFormContainer = styled.form`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, max-content));
  justify-items: center;
  grid-row-gap: 20px;
  grid-column-gap: 40px;
  width: 100%;
  margin: 0 auto 50px;

  @media ${props => props.theme.breakpoints.mobile} {
    grid-template-columns: 1fr;
  }

  .form-content {
    // justify-self: flex-start;

    display: flex;
    flex-direction: column;
    grid-gap: 20px;

    span {
      align-self: flex-start;
    }
  }

  .form-help {
    display: flex;
    flex-direction: column;
    grid-gap: 25px;

    @media ${props => props.theme.breakpoints.mobile} {
      justify-self: center;
      max-width: 75%;
    }
    h2 {
      margin-bottom: 5px;
    }
  }

  h3 {
    span {
      font-size: 12pt;
      font-weight: normal;
    }
  }

  .special-div {
    margin-bottom: -20px;
  }

  label {
    display: flex;
    flex-direction: column;
  }
  .hire-date-inputs {
    display: flex;
    flex-direction: row;
    grid-gap: 5px;

    @media ${props => props.theme.breakpoints.mobile} {
      flex-direction: column;
    }

    span {
      font-size: 9pt;
      margin-bottom: -5px;
    }

    input {
      max-width: 125px;
    }
  }

  select {
    max-width: min-content;
  }

  .buttons {
    display: flex;
    align-items: flex-end;
    width: 100%;
  }

  .submit-btn {
    flex: 1;
    margin-right: 15px;
    padding: 2px 5px;
    color: ${props => props.theme.grayscale.light1};
    background: inherit;
    border: 2px solid ${props => props.theme.colors.link};

    :disabled {
      color: ${props => props.theme.grayscale.dark2};
      background: ${props => props.theme.grayscale.dark1};
      border: 2px solid ${props => props.theme.grayscale.dark4};
    }
  }

  .edit-btn {
    background: inherit;
    border: none;
    text-decoration: underline;
    color: ${props => props.theme.grayscale.light1};
    cursor: pointer;
  }
  .edit-btn:disabled {
    color: ${props => props.theme.grayscale.light3};
  }

  input[type="number"]:disabled {
    color: ${props => props.theme.grayscale.dark2};
  }
  .react-date-picker {
    cursor: "auto";
  }
  .react-date-picker__inputGroup__input {
    color: ${props => props.theme.grayscale.light1};
  }
  .react-date-picker__wrapper {
    flex-grow: 0;
  }
  .react-date-picker__button__icon {
    stroke: ${props => props.theme.colors.link};
  }
  .react-date-picker__button:enabled:hover svg {
    stroke: ${props => props.theme.colors.green};
  }
  .react-date-picker--disabled {
    background: inherit;
    .react-date-picker__wrapper {
      background: ${props => props.theme.grayscale.dark3};
    }
    cursor: "not-allowed";
  }
`

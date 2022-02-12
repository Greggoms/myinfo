import styled from "styled-components"

export const ProfileContainer = styled.section`
  max-width: 80rem;
  margin: 1rem auto;
  line-height: 20pt;
  display: grid;
  grid-template-columns: 100px 1fr;
  grid-gap: 2rem;

  @media ${props => props.theme.breakpoints.tablet} {
    grid-template-columns: 1fr;
  }

  section {
    grid-column: 2;
    @media ${props => props.theme.breakpoints.tablet} {
      grid-column: 1;
    }
  }

  h2 {
    margin-bottom: 1rem;
  }

  .toggle-form-btn {
    grid-column: 1;
    grid-row: 1;
    align-self: flex-start;
    cursor: pointer;
    max-width: 200px;
  }

  form {
    display: flex;
    flex-direction: column;
    grid-row-gap: 20px;
    width: 100%;
    max-width: 325px;
    margin-bottom: 50px;

    .react-date-picker__inputGroup__input {
      color: ${props => props.theme.grayscale.light1};
    }
    .react-date-picker__wrapper {
      flex-grow: 0;
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
    }

    .submit-btn {
      max-width: 100px;
      margin-right: 15px;
    }

    .edit-btn {
      background: inherit;
      border: none;
      text-decoration: underline;
      color: ${props => props.theme.grayscale.light1};
      cursor: pointer;
    }

    input[type="button"]:disabled {
      color: ${props => props.theme.grayscale.light3};
    }
    input[type="number"]:disabled {
      color: ${props => props.theme.grayscale.dark2};
    }
    .react-date-picker {
      cursor: "auto";
    }
    .react-date-picker__button__icon {
      stroke: ${props => props.theme.colors.link};
    }
    .react-date-picker__button:enabled:hover svg {
      stroke: ${props => props.theme.colors.green};
    }
    .react-date-picker--disabled {
      background: ${props => props.theme.grayscale.dark3};
      cursor: "not-allowed";
    }

    .tooltip {
      position: relative;
      display: inline-block;
      background: ${props => props.theme.grayscale.dark3};
      width: 25px;
      height: 25px;
      border-radius: 50%;
      text-align: center;
      margin-left: 10px;
    }

    .tooltip .tooltiptext {
      visibility: hidden;
      width: 350px;
      background-color: ${props => props.theme.grayscale.dark4};
      color: ${props => props.theme.grayscale.light1};
      text-align: left;
      border-radius: 6px;
      padding: 10px;

      /* Position the tooltip */
      position: absolute;
      left: 0;
      top: 25px;
      z-index: 1;

      @media ${props => props.theme.breakpoints.tablet} {
        width: 200px;
        left: -325%;
        margin: 0 auto;
      }

      ul {
        margin-left: 20px;
      }
      ul ul {
        margin-left: 30px;
      }
    }

    .tooltiptext-modal {
      position: relative;
      display: inline-block;
      width: 80vw;
      transform: translateX(-90%);

      background-color: ${props => props.theme.grayscale.dark4};
      color: ${props => props.theme.grayscale.light1};
      border-radius: 6px;
      padding: 10px;
      z-index: 2;
    }

    .tooltip:hover .tooltiptext {
      visibility: visible;
    }
  }
`

export const DatabaseProfileContainer = styled.section`
  .highlights {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
    grid-row-gap: 2rem;
    grid-column-gap: 0.5rem;
    text-align: center;
    margin-bottom: 1rem;

    .highlight {
      background: ${props => props.theme.grayscale.dark3};
      height: 7rem;
      padding: 1rem 0;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      @media only screen and (max-width: 600px) {
        height: 8rem;
      }

      h3 {
        font-size: 26pt;
        @media only screen and (max-width: 600px) {
          font-size: 24pt;
        }
      }

      h4 {
        font-size: 17pt;
      }
    }
  }

  .special-h2 {
    margin-bottom: 0;
  }

  hr {
    border-top: 2px solid ${props => props.theme.colors.link};
    width: 40%;
    margin: 0 auto;
  }
`

export const RequestsContainer = styled.section`
  display: flex;
  justify-content: space-around;
  grid-column-gap: 1rem;

  max-width: 55rem;
  margin: 2rem auto 0;

  @media only screen and (max-width: 600px) {
    flex-direction: column;
  }

  ul {
    li {
      margin-left: 2rem;
    }
  }

  .pending-requests {
    margin: 0 0 1.5rem;
    h3 {
      text-decoration: underline;
      text-decoration-color: ${props => props.theme.colors.purple};
    }
  }
  .accepted-requests {
    h3 {
      text-decoration: underline;
      text-decoration-color: ${props => props.theme.colors.green};
    }
  }
`

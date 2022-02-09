import styled from "styled-components"

export const ProfileContainer = styled.section`
  max-width: 70rem;
  margin: 1rem auto;
  line-height: 20pt;
  display: grid;
  grid-gap: 2rem;

  h2 {
    margin-bottom: 1rem;
  }

  form {
    display: flex;
    flex-direction: column;
    grid-row-gap: 20px;
    width: 100%;
    max-width: 325px;
    margin: 0 auto;
    margin-bottom: 50px;

    @media ${props => props.theme.breakpoints.mobile} {
    }

    .get-started {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    h3 {
      text-align: center;

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

    .submit-btn {
      max-width: 100px;
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
export const NetlifyIdentityContainer = styled.section``

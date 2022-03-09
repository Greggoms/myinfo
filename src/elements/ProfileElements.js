import styled from "styled-components"

export const ProfileContainer = styled.section`
  grid-column: 2 / span 6;
  @media ${props => props.theme.breakpoints.mobile} {
    grid-column: 2 / 3;
  }

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
    justify-self: center;
    align-self: flex-start;
    cursor: pointer;
    width: 100%;
    max-width: 200px;
  }
`

export const ProfilePageErrorContainer = styled.section`
  grid-column: 2 / span 6;
  @media ${props => props.theme.breakpoints.mobile} {
    grid-column: 2 / 3;
  }
  text-align: center;
`

export const DatabaseProfileContainer = styled.section`
  .main-highlights {
    margin-bottom: 20px;
  }

  .highlights {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
    grid-row-gap: 2rem;
    grid-column-gap: 0.5rem;
    text-align: center;

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

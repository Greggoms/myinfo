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
`

export const DatabaseProfileContainer = styled.section`
  h3 {
    font-size: 26pt;
    @media only screen and (max-width: 600px) {
      font-size: 24pt;
    }
  }

  .highlights {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
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
    }
  }
`

export const NetlifyIdentityContainer = styled.section``

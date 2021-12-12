import styled from "styled-components"

export const IndexPageContainer = styled.div`
  margin: 0 auto;
  max-width: 960px;
  h1 {
    margin-bottom: 3rem;
    text-align: center;
  }
  h2 {
    line-height: 1.5;
  }
  p {
    margin-bottom: 2rem;
    line-height: 20pt;
  }

  .intro {
    margin: 0 auto;
    max-width: 30rem;
  }
`

export const CTAContainer = styled.section`
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
  margin-bottom: 2rem;
  max-width: 20rem;
  margin: 0 auto 4rem;

  .primary {
    background: inherit;
    padding: 0.7rem 1.5rem;
    border: 1px solid ${props => props.theme.grayscale.dark4};
    border-radius: 0.5rem;
    color: ${props => props.theme.grayscale.light1};

    :hover {
      color: ${props => props.theme.grayscale.light1};
      background: ${props => props.theme.grayscale.dark4};
    }
  }

  .secondary {
    color: ${props => props.theme.grayscale.light1};
    background: inherit;
    text-decoration: underline;
  }
`

export const ButtonLinkContainer = styled.button`
  background: inherit;
  transition: all 0.3s ease;
  padding: 0.2rem 0.1rem 0.5rem;

  border: none;
  cursor: pointer;
  a:link {
    border: none;
    color: black;
  }
  a:visited {
    color: black;
  }
  a:hover {
    color: ${props => props.theme.grayscale.light1};
    background: ${props => props.theme.grayscale.dark4};
  }
  a:active {
  }
  a {
    transition: all 0.3s ease;
    padding: 0.2rem 0.1rem 0.5rem;
    background: rgba(181, 218, 255);
  }
`

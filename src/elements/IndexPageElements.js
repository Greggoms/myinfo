import styled from "styled-components"

export const IndexPageContainer = styled.div`
  margin: 0 auto;
  max-width: 960px;
  h1 {
    margin-bottom: 1.5rem;
    text-align: center;
  }
  h2 {
    line-height: 1.5;
  }
  p {
    margin-bottom: 2rem;
  }

  a:link {
    border: none;
  }
  a:visited {
  }
  a:hover {
    color: ${props => props.theme.colors.green};
  }
  a:active {
  }
  a {
    color: ${props => props.theme.colors.link};
    transition: all 0.3s ease;
    padding: 0.2rem 0.1rem 0.5rem;
  }

  .intro {
    margin: 0 auto;
    max-width: 30rem;
  }

  .welcome {
    article {
      display: flex;
      grid-gap: 50px;
      margin: 30px auto;

      @media ${props => props.theme.breakpoints.tablet} {
        flex-direction: column;
      }
    }

    h2 {
      margin-bottom: 40px;
    }

    h4 {
      text-align: center;
      font-size: 20pt;
      margin-bottom: 10px;
    }
    p {
      margin-bottom: 5px;
    }

    .point,
    span {
      text-decoration: underline;
    }

    ul ul {
      margin-bottom: 20px;
    }

    ul li {
      margin-left: 20px;
      margin-bottom: 5px;
    }

    ul ul li {
      margin-left: 45px;
    }
    ul ul ul li {
      margin-left: 70px;
    }

    hr {
      border-top: 2px solid ${props => props.theme.grayscale.light1};
      background: inherit;
    }
  }
`

export const ButtonLinkContainer = styled.button`
  background: inherit;
  transition: all 0.3s ease;
  padding: 0.2rem 0.1rem 0.5rem;

  border: none;
  cursor: pointer;
`

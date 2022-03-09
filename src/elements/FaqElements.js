import styled from "styled-components"

export const FaqContainer = styled.div`
  grid-column: 2 / span 6;
  @media ${props => props.theme.breakpoints.mobile} {
    grid-column: 2 / 3;
  }

  display: flex;
  flex-direction: column;
  grid-gap: 30px;
  line-height: 22px;

  details {
    border: 1px solid #aaa;
    border-radius: 4px;
    padding: 0.5em 0.5em 0;

    p:not(:last-child) {
      margin-bottom: 20px;
    }

    ul,
    ol {
      margin-left: 30px;
    }
    ul:not(:last-child),
    ol:not(:last-child) {
      margin-bottom: 15px;
    }
  }

  summary {
    font-weight: bold;
    margin: -0.5em -0.5em 0;
    padding: 0.5em;
  }

  details[open] {
    padding: 0.5em;
  }

  details[open] summary {
    border-bottom: 1px solid #aaa;
    margin-bottom: 0.5em;
  }

  .or {
    margin: 5px 0 5px 10px !important;
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
`

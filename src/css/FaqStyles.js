import styled from "styled-components"

export const FaqContainer = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: 30px;

  line-height: 22px;

  .steps {
    display: flex;
    flex-direction: column;
    grid-gap: 60px;
  }

  h3 {
    margin-bottom: 10px;
  }

  .w4 {
    margin-bottom: 10px;
    h3 {
      margin-bottom: 0;
    }
  }

  h4 {
    font-size: 18pt;
  }

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

  details:not(:last-child) {
    margin-bottom: 5px;
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

  blockquote {
    border-top: 2px solid ${props => props.theme.grayscale.light1};
    border-right: 2px solid ${props => props.theme.grayscale.light1};
    border-left: 2px solid ${props => props.theme.grayscale.light1};
    width: max-content;
    padding: 0 5px;
  }

  .or {
    margin: 5px 0 5px 10px !important;
  }

  hr {
    border: none;
    border-top: 3px solid ${props => props.theme.colors.link};
    width: 50%;
    margin: 0;
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

import styled from "styled-components"

export const DocumentsPageContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 20px;

  /* @media ${props => props.theme.breakpoints.desktop} {
    flex-direction: row-reverse;
    justify-content: center;
  } */

  .document-sections {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-content: flex-start;
    gap: 25px;

    @media ${props => props.theme.breakpoints.tablet} {
      flex-direction: row;
    }
  }

  .document-section {
    display: flex;
    flex-direction: column;

    background: ${props => props.theme.grayscale.light1};
    color: ${props => props.theme.grayscale.dark4};
    padding: 10px;
    min-width: 240px;
    max-width: 300px;

    h2 {
      margin-bottom: 5px;
      text-align: center;
    }

    ul {
      margin-left: 15px;
      margin-bottom: 20px;

      flex: 1;
    }
  }

  button {
    align-self: center;
  }

  .doc-list {
    width: 100%;
    max-width: fit-content;
    margin: 0 auto;

    h2 {
      text-align: center;
      margin-bottom: 15px;
    }

    ul {
      margin-left: 15px;
    }

    li:not(:last-child) {
      margin-bottom: 5px;
    }

    .columns {
      display: flex;
      flex-direction: column;
      gap: 20px;

      hr {
        border: none;
        border-bottom: 2px solid ${props => props.theme.grayscale.light1};
        margin: 5px 0;
      }

      @media ${props => props.theme.breakpoints.tablet} {
        flex-direction: row;
      }
    }

    a:link {
      color: ${props => props.theme.colors.link};
    }
    a:visited {
      color: ${props => props.theme.colors.linkLight};
    }
    a:hover {
      color: ${props => props.theme.grayscale.light1};
    }
    a:active {
      color: ${props => props.theme.colors.green};
    }
  }
`

export const PoliciesContainer = styled.section`
  h2 {
    margin-bottom: 10px;
    text-align: center;
  }
  .policies-shared {
    hr {
      margin: 40px 0 20px;
    }
  }

  .button-container {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    width: 100%;
    max-width: 600px;
    margin: 0 auto 30px;

    button {
      padding: 10px;
    }
  }
`

export const DocumentsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 50px;

  @media ${props => props.theme.breakpoints.tablet} {
    grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  }

  a {
    color: ${props => props.theme.grayscale.light1};
  }

  .document {
    display: flex;
    flex-direction: column;
    gap: 22px;

    .pdf-container {
      width: 100%;
      height: 250px;
      border: none;
      transition: all 0.2s ease;

      .rpv-core__inner-pages {
        overflow: hidden !important;
      }
      .rpv-core__canvas-layer,
      .rpv-core__page-layer.document,
      canvas {
        width: 100% !important;
      }
    }
    html {
      display: none;
    }

    &-link {
      display: flex;
      gap: 5px;
    }
    &-info {
      p {
        font-size: 10pt;
        color: ${props => props.theme.grayscale.light2};
      }
    }
  }
`

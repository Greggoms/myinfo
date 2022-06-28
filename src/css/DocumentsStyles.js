import styled from "styled-components"

export const DocumentsPageContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 25px;

  margin: 0 auto;
  width: fit-content;

  @media ${props => props.theme.breakpoints.tablet} {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    justify-items: center;
    gap: 20px;
  }

  ul {
    margin-left: 15px;
    margin-bottom: 20px;
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

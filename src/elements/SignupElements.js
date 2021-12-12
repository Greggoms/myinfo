import styled from "styled-components"

export const LogContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  @media only screen and (min-width: 600px) {
    margin-right: 2rem;
  }

  button:first-child {
    margin-right: 1rem;
  }

  button {
    background: none;
    border: none;
    color: ${props => props.theme.grayscale.light1};
    cursor: pointer;
    text-decoration: underline;
  }

  span {
    color: ${props => props.theme.grayscale.light1};
    margin-right: 0.5rem;
    font-size: 12pt;
  }
`
export const ModalButtonContainer = styled.div`
  /* max-width: 12rem; */
  display: flex;
  justify-content: space-between;
  @media only screen and (max-width: 600px) {
    width: 100%;
    margin: 0rem 0 2rem;
  }
`

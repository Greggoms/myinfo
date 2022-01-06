import styled from "styled-components"

export const LogContainer = styled.div`
  grid-column: 1 / -1;
  grid-row: 2;

  @media only screen and (min-width: 500px) {
    grid-column: 2;
    grid-row: 1;
  }

  button:first-child {
    margin-right: 1rem;
    text-decoration: none;
    border-bottom: 2px solid ${props => props.theme.colors.link};
  }

  button {
    background: none;
    border: none;
    color: ${props => props.theme.grayscale.light2};
    cursor: pointer;
    text-decoration: underline;
  }

  span {
    color: ${props => props.theme.grayscale.light2};
    margin-right: 0.5rem;
    font-size: 12pt;
    width: 100%;
    min-width: min-content;
    max-width: max-content;
  }
`
export const ModalButtonContainer = styled.div`
  display: flex;
  /* justify-content: space-around; */
  align-items: flex-end;
`

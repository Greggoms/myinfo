import styled from "styled-components"

export const ModifyUserContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: min-content auto;
  grid-template-areas: "close close" "current form";
  row-gap: 20px;

  position: fixed;
  top: 100px;
  left: 0;
  overflow: scroll;

  background: rgba(53, 53, 53, 0.9);
  width: 100%;
  height: 100%;
  padding: 20px;

  .modify-close {
    grid-area: close;
    justify-self: center;
    width: 150px;
    height: 30px;
  }
  .modify-current {
    grid-area: current;
  }
  .modify-form {
    grid-area: form;
  }

  h2 {
    text-align: center;
  }
  span {
    font-size: 10pt;
  }
  .label {
    display: flex;
    flex-direction: column;
  }
  .label:not(:last-child) {
    margin-bottom: 10px;
  }
  .react-date-picker__inputGroup input {
    color: #fff;
  }
`

import styled from "styled-components"

export const ModifyUserContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  position: fixed;
  top: 0;
  left: 0;
  overflow: scroll;

  background: rgba(53, 53, 53, 0.9);
  width: 100%;
  height: 100%;
  padding: 20px;

  .modify-close {
    height: 30px;
    cursor: pointer;
  }

  h2 {
    text-align: center;
    margin-bottom: 15px;
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

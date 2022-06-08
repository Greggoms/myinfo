import styled from "styled-components"

export const DeleteUserButton = styled.button`
  background: none;
  border: none;
  border-bottom: 2px dashed ${props => props.theme.colors.red};
  color: ${props => props.theme.colors.red};
  cursor: pointer;

  padding: 5px;

  :disabled,
  [disabled] {
    border: 1px solid #999999;
    background-color: #cccccc;
    color: #666666;
    cursor: not-allowed;
  }
`

export const ModifyUserButton = styled.button`
  background: none;
  border: none;
  border: 2px solid ${props => props.theme.colors.link};
  border-radius: 5px;
  color: ${props => props.theme.grayscale.light1};
  cursor: pointer;

  padding: 5px;
`

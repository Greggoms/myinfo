import styled from "styled-components"

export const NotificationContainer = styled.div`
  color: ${props => props.theme.grayscale.light2};
  margin: 0 auto;
  max-width: 960px;
  text-align: center;

  a {
    color: ${props => props.theme.colors.linkLight};
  }
`

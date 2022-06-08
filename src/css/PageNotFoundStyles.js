import styled from "styled-components"

export const PageNotFoundContainer = styled.section`
  grid-column: 2 / span 6;
  @media ${props => props.theme.breakpoints.mobile} {
    grid-column: 2 / 3;
  }
`

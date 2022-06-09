import styled from "styled-components"

export const PageNotFoundContainer = styled.section`
  grid-column: 2 / 3;
  @media ${props => props.theme.breakpoints.tablet} {
    grid-column: 2 / span 6;
  }
`

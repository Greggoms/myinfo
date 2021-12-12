import styled from "styled-components"

export const PageRefreshContainer = styled.div`
  animation-duration: 0.5s;
  animation-name: appear;

  @keyframes appear {
    from {
      opacity: 0;
    }

    75% {
      opacity: 0.75;
    }

    to {
      opacity: 1;
    }
  }
`

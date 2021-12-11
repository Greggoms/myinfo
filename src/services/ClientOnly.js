import React, { useState, useEffect } from "react"
import styled from "styled-components"

export const ClientOnly = ({ children }) => {
  const [hasMounted, setHasmounted] = useState(false)

  useEffect(() => {
    setHasmounted(true)
  }, [])

  if (!hasMounted) {
    return null
  }

  return <PageRefreshContainer>{children}</PageRefreshContainer>
}

const PageRefreshContainer = styled.div`
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

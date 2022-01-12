import React, { useState, useEffect } from "react"
import { PageRefreshContainer } from "../elements"

export const ClientOnly = ({ children }) => {
  const [hasMounted, setHasmounted] = useState(false)

  useEffect(() => {
    setHasmounted(true)
  }, [])

  if (!hasMounted) {
    return <h1>Loading...</h1>
  }

  return <PageRefreshContainer>{children}</PageRefreshContainer>
}

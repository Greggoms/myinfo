import React, { useState, useEffect } from "react"
import { PageRefreshContainer } from "../elements"

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

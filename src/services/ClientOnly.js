import React, { useState, useEffect } from "react"
import scrollTo from "gatsby-plugin-smoothscroll"
import { PageRefreshContainer } from "../elements"

export const ClientOnly = ({ children }) => {
  const [hasMounted, setHasmounted] = useState(false)

  useEffect(() => {
    setHasmounted(true)
    scrollTo("#top")
  }, [])

  if (!hasMounted) {
    return null
  }

  return <PageRefreshContainer>{children}</PageRefreshContainer>
}

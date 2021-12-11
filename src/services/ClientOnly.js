import { useState, useEffect } from "react"

export const ClientOnly = ({ children }) => {
  const [hasMounted, setHasmounted] = useState(false)

  useEffect(() => {
    setHasmounted(true)
  }, [])

  if (!hasMounted) {
    return null
  }

  return children
}

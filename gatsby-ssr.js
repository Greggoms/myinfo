import React from "react"
import { Theme } from "./src/themes/Theme"
import Layout from "./src/components/layout"
const { createGlobalStyle, ThemeProvider } = require("styled-components")
const netlifyIdentity = require("netlify-identity-widget")

export const wrapRootElement = ({ element, props }) => {
  netlifyIdentity.init()
  netlifyIdentity.store.user &&
    netlifyIdentity.refresh().then(jwt => console.log(jwt))
  console.log(netlifyIdentity)
  return (
    <>
      <ThemeProvider theme={Theme}>
        <GlobalStyles />
        <Layout {...props}>{element}</Layout>
      </ThemeProvider>
    </>
  )
}

const GlobalStyles = createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body, html {
    font-family: ${Theme.fonts.main};
    height: 100%;
    background-color: ${Theme.cubePalette.light};
}
    
body {
    margin-right: 0px !important;
}

[data-reach-dialog-overlay] {
  position: absolute !important;
}
`

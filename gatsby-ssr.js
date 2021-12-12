import React from "react"
import { Theme } from "./src/themes/Theme"
import Layout from "./src/components/layout"
import { isBrowser } from "./src/services/isBrowser"
import { ClientOnly } from "./src/services/ClientOnly"
const { createGlobalStyle, ThemeProvider } = require("styled-components")
const netlifyIdentity = require("netlify-identity-widget")

export const wrapRootElement = ({ element, props }) => {
  const user = netlifyIdentity.currentUser()
  if (isBrowser) {
    netlifyIdentity.init()
    user && netlifyIdentity.refresh()
    console.log(user)
  }
  return (
    <ThemeProvider theme={Theme}>
      <ClientOnly>
        <GlobalStyles />
        <Layout {...props}>{element}</Layout>
      </ClientOnly>
    </ThemeProvider>
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
    font-display: fallback; /* <- this can be added to each @font-face definition */
    height: 100%;
    background-color: ${Theme.cubePalette.light};
    
  }
  
  html html iframe #netlify-identity-widget {
    .modalContainer {
      justify-content: center !important;
    }
    .modalDialog {
      flex-grow: 0 !important;
    }
  }
    
body {
    margin-right: 0px !important;
}

[data-reach-dialog-overlay] {
  position: absolute !important;
}
`

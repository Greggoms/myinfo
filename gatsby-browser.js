import React from "react"
import { Provider } from "react-redux"
import { store } from "./src/app/store"
import { Theme } from "./src/themes/Theme"
import { createGlobalStyle, ThemeProvider } from "styled-components"
import Layout from "./src/components/layout"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.min.css"

export const wrapRootElement = ({ element, props }) => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={Theme}>
        <GlobalStyles />
        <Layout {...props}>{element}</Layout>
      </ThemeProvider>
      <ToastContainer newestOnTop={true} containerId="notifyToast" />
    </Provider>
  )
}

const GlobalStyles = createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

*:before,
*:after {
  box-sizing: border-box;
}

body, html {
  font-family: ${Theme.fonts.main};
  font-display: fallback; /* <- this can be added to each @font-face definition */
  background-color: ${Theme.grayscale.dark3};
}

.page-container {
  display: grid;
  grid-template-columns: 10vw repeat(6, 1fr) 10vw;
}

.page-content {
  grid-column: 2 / span 6;
}

.Toastify__toast {
  min-width: min-content;
  width: 100% !important;
  max-width: 600px;
}

.Toastify__toast-container {
  min-width: min-content;
  width: 100% !important;
  max-width: 600px;
}

@media only screen and (max-width: 400px) {
  .Toastify__toast-body {
    flex-direction: column;
  }
}

[data-reach-dialog-overlay] {
  position: absolute !important;
}

`

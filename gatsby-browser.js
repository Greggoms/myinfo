import React from "react"
import { Provider } from "react-redux"
import { store } from "./src/app/store"
import theme from "./src/theme"
import { createGlobalStyle, ThemeProvider } from "styled-components"
import Layout from "./src/components/layout"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.min.css"

export const wrapRootElement = ({ element, props }) => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Layout {...props}>{element}</Layout>
      </ThemeProvider>
      <ToastContainer newestOnTop={true} position="top-center" />
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
  background-color: ${theme.grayscale.dark3};
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

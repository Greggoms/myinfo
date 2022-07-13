const path = require("path")
exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions

  if (page.path.match(/^\/app/)) {
    page.matchPath = `/app/*`

    // Update the page.
    createPage(page)
    createPage({
      path: "/app/admin/users",
      matchPath: "/app/admin/users/*",
      component: path.resolve("src/components/admin/UserDetails.js"),
    })
  }
}

// Config for pdf.js
exports.onCreateWebpackConfig = ({
  stage,
  rules,
  loaders,
  plugins,
  actions,
}) => {
  // It's required by pdfjs-dist
  actions.setWebpackConfig({
    externals: [
      {
        canvas: "canvas",
      },
    ],
  })
}

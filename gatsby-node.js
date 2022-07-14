const path = require("path")
exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions

  if (page.path.match(/^\/app/)) {
    page.matchPath = `/app/*`
    createPage({
      path: "/app/profile",
      component: path.resolve("src/components/profile.js"),
    })
    createPage({
      path: "/app/admin",
      component: path.resolve("src/components/admin/admin.js"),
    })
    // createPage({
    //   path: "/app/login",
    //   component: path.resolve("src/components/login.js"),
    // })
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

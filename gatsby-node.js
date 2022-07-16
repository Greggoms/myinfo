const path = require("path")
exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions

  if (page.path.match(/^\/app/)) {
    page.matchPath = `/app/*`
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

// 2022-07-15
// I am so dumb. Ive been wondering why users weren't
// being navigated automatically to the login page
// if they hit a PrivateRoute. Well...
// It turns out the old gatsby-node logic was saying
// "Create pages at these routes using these components."
// I'm pretty sure is was clashing with the app.js Router.
// Now everything works as expected and there is no
// crashing on navigate() :D

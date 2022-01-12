// const path = require("path")

// Implement the Gatsby API “onCreatePage”. This is
// called after every page is created.
exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions
  // page.matchPath is a special key that's used for matching pages
  // only on the client.
  if (page.path.match(/^\/app/)) {
    page.matchPath = "/app/*"
    // Update the page.
    createPage(page)
  }

  // DANGEROUS
  // uncommenting this will cause the homepage to not load
  // at all, UNLESS you also comment out the rest of the file.

  // else if (page.path.match("/")) {
  //   page.matchPath = "/"
  //   // Update the page.
  //   createPage(page)
  // }
}

// I need to fix an error. steps to recreate:
//
// 1. sign in.
// 2. refresh browser while in profile/dashboard.
// 3. logout.
//
// Result: Logging out forces user to a home page
//         that doesnt exist. Does not crash in
//         production, only dev, though there is
//         a flicker.
//
// First attempt below...

// const path = require(`path`)

// exports.createPages = async ({ actions }) => {
//   const { createPage } = actions
//   const IndexPage = path.resolve(`/`)
//   createPage({
//     path: `/`,
//     component: IndexPage,
//   })
// }

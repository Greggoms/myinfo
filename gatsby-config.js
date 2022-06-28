require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: `AbbyHQ`,
    description: `Come here to see your employee stats. Made with some cool technology.`,
    author: `Greggoms`,
  },
  plugins: [
    `gatsby-plugin-next-seo`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pdfsnewhire`,
        path: `${__dirname}/src/pdfs/newhire`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pdfsother`,
        path: `${__dirname}/src/pdfs/other`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pdfspoliciesabbyroad`,
        path: `${__dirname}/src/pdfs/policies/abbyroad`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pdfspoliciesvhd`,
        path: `${__dirname}/src/pdfs/policies/vhd`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pdfspoliciesvaporworld`,
        path: `${__dirname}/src/pdfs/policies/vaporworld`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pdfspolicieswonderland`,
        path: `${__dirname}/src/pdfs/policies/wonderland`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pdfspoliciesshared`,
        path: `${__dirname}/src/pdfs/policies/shared`,
      },
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /svg/,
        },
      },
    },
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        // This will impact how browsers show your PWA/website
        // https://css-tricks.com/meta-theme-color-and-trickery/
        // theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`,
      },
    },
  ],
}

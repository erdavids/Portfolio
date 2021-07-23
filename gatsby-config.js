module.exports = {
  siteMetadata: {
    siteUrl: "https://www.erdavids.com",
    title: "Portfolio",
  },
  plugins: [
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        trackingId: "UA-138963802-1",
      },
    },
    "gatsby-plugin-image",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sharp",
    "gatsby-plugin-nodejs",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "markdown-pages",
        path: "./src/markdown-pages",
      },
    },
    "gatsby-transformer-remark",
    "gatsby-plugin-catch-links",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images"
    },
  ],
};

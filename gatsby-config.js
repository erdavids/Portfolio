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
    "gatsby-plugin-react-helmet",
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
  ],
};

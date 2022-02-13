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
    "gatsby-plugin-sharp",
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          "gatsby-remark-relative-images",
          {
            resolve: "gatsby-remark-images",
            options: {

            },
          },
        ],

      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "markdown-pages",
        path: "./src/markdown-pages",
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: './src/images',
      },
    },
    "gatsby-plugin-catch-links",
  ],
};

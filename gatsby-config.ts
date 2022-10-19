import type { GatsbyConfig } from 'gatsby';

const config: GatsbyConfig = {
  siteMetadata: {
    title: `Sangwook's Personal Website`,
    siteUrl: `https://sangwooklee.info`,
    twitterUsername: `@leesang627`,
    description: `Sangwook's Personal Website with publications and blogs`,
    image: '/icon.png',
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        // You can add multiple tracking ids and a pageview event will be fired for all of them.
        trackingId: 'G-T46Q28G7H7',
      },
    },
    'gatsby-plugin-image',
    'gatsby-plugin-postcss',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        icon: 'src/images/icon.png',
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        gatsbyRemarkPlugins: [
          `gatsby-remark-responsive-iframe`,
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 800,
            },
          },
        ],
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          `gatsby-remark-responsive-iframe`,
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 800,
            },
          },
        ],
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: './src/images/',
      },
      __key: 'images',
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: './src/pages/',
      },
      __key: 'pages',
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'info',
        path: `${__dirname}/contents/info`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'publications',
        path: `${__dirname}/contents/publications`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'news',
        path: `${__dirname}/contents/news`,
      },
    },
    {
      resolve: 'gatsby-plugin-anchor-links',
      options: {
        duration: 500,
        offset: -10,
      },
    },
  ],
};

export default config;

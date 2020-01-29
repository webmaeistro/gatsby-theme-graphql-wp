const path = require('path');
const prepareThemeOptions = require('./src/utils/prepareThemeOptions');

module.exports = options => {
  // applies defaults and normalizes options
  const themeOptions = prepareThemeOptions(options);
  const {
    wordPressUrl,
    uploadsUrl,
    graphqlUrl,
    processPostTypes,
    wpqlTypeName,
    generateWebp,
    debugOutput,
  } = themeOptions;

  console.log(`wordpress URL: ${wordPressUrl}`);
  console.log(`uploads URL: ${uploadsUrl}`);
  console.log(`graphql URL: ${graphqlUrl}`);

  return {
    siteMetadata: {
      title: `WordPress Source gatsby graphql`,
      author: `webmaeistro`,
      description: `WordPress source  GatsbyJS. Uses WPGraphQL (GraphQL for WordPress).`,
      social: [
        {
          name: `twitter`,
          url: `https://twitter.com/webmaeistro`,
        },
        {
          name: `github`,
          url: `https://github.com/webmaeistro`,
        },
      ],
      themeOptions,
    },
    plugins: [
      {
        resolve: 'gatsby-wpgraphql-inline-images',
        options: {
          wordPressUrl,
          uploadsUrl,
          processPostTypes,
          generateWebp,
          debugOutput,
          graphqlTypeName: wpqlTypeName,
        },
      },
      // Setup WPGraphQL.com to be the source
      {
        resolve: `gatsby-source-graphql`,
        options: {
          // This type will contain remote schema Query type
          typeName: wpqlTypeName,
          // This is field under which it's accessible
          fieldName: `wpgraphql`,
          // Url to query from
          url: graphqlUrl,
        },
      },
      `gatsby-plugin-react-helmet`,
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          name: `images`,
          path: path.join(__dirname, 'src/images'),
        },
      },
      `gatsby-plugin-sharp`,
      `gatsby-transformer-sharp`,
      `gatsby-plugin-theme-ui`,
      {
        resolve: 'gatsby-plugin-page-creator',
        options: {
          path: path.join(__dirname, 'src/pages'),
        },
      },
    ],
  };
};



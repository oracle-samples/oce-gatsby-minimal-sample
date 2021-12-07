/**
 * Copyright (c) 2021 Oracle and/or its affiliates.
 * Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl.
 */

/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */
require('dotenv').config();

module.exports = {
  pathPrefix: process.env.PATH_PREFIX,
  // Add support for loading some images from local filesystem
  plugins: [
    {
      resolve: '@oracle/gatsby-source-oce',
      options: {
        name: 'oce',
        contentServer: process.env.SERVER_URL,
        channelToken: process.env.CHANNEL_TOKEN,
        proxyUrl: process.env.PROXY_URL,
        items: {
          limit: 100,
        },
        renditions: 'none',
        // if true then digital assets are downloaded locally
        staticAssetDownload: true,
        // This determines the base directory in the path for the assets.
        //  Used when staticAssetDownload is true
        staticAssetRootDir: 'contentServer',
        staticUrlPrefix: process.env.PATH_PREFIX,
      },
    },
    {
      resolve: 'gatsby-source-graphql',
      options: {
        // This type will contain remote schema Query type
        typeName: 'OCM',
        // This is the field under which it's accessible
        fieldName: 'ocm',
        // URL to query from
        url: `${process.env.SERVER_URL}/content/published/api/v1.1/graphql`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images/`,
      },
    },
    'gatsby-plugin-react-helmet',
  ],
};

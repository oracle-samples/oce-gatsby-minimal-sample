/**
 * Copyright (c) 2021 Oracle and/or its affiliates.
 * Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl.
 */

/* eslint-disable no-param-reassign */

const path = require('path');

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const pageTemplate = path.resolve(
    'src/templates/pageTemplate.jsx',
  );
  const peopleTemplate = path.resolve(
    'src/templates/peopleTemplate.jsx',
  );

  /* Query for all date used in creating pages.
  *  minimalMain: Query to find starting data structure (number of pages, etc...)
  *  allTextData: Query to gather all displayed text information for all pages
  *  allImageData: Query to gather all displayed images for all pages
  */
  return graphql(`{
    minimalMain: oceAsset(slug: {eq: "minimalmaingraphql"}) {
      description
      oceType
      oceFields {
        pages {
          fields {
            sections {
              name
              id
              type
              typeCategory
            }
          }
          name
          slug
        }
        footerlogo {
          id
          name
          slug
        }
        headerlogo {
          id
          name
          slug
        }
      }
      slug
    }
    allTextData: allOceAsset {
      nodes {
        sections {
          name
          fields {
            type
            body
            heading
            image {
              name
              id
            }
            actions {
              name
              link
            }
          }
          id
        }
      }
    }
    allImageData: allOceAsset(filter: {staticURL: {ne: null}}) {
      nodes {
        name
        oceId
        staticURL
      }
    }
  }`).then((result) => {
    if (result.errors) {
      throw result.errors;
    }

    const minimalMainPagesResult = result.data.minimalMain.oceFields;
    const allTextDataResult = result.data.allTextData;
    const allImageDataResult = result.data.allImageData;

    /* Populates minimalMainPageResult with proper data such as:
    * 1 - All text data associated with each section on the page
    * 2 - All image data associated with each section on the page (if exists)
    *
    * Code loops through all pages, then sections, then all text data to find matching
    * text based on ID. An image search is also performed if an image should exist with the
    * section. The text data and image data (if applicable) is associated with the main data
    * structure of the section, which is tied to a page, which are all tied to the variable
    * minimalMainPageResult.
    */
    minimalMainPagesResult.pages.forEach((page) => {
      if (page.slug !== 'people') {
        page.fields.sections.forEach((sectionPage) => {
          allTextDataResult.nodes.forEach((sectionTexts) => {
            if (sectionTexts.sections !== null) {
              sectionTexts.sections.forEach((sectionText) => {
                if (sectionText.id === sectionPage.id) {
                  sectionPage.textData = sectionText.fields;
                  if (sectionText.fields.image !== null) {
                    allImageDataResult.nodes.forEach((image) => {
                      if ((image.name)
                        .localeCompare(sectionText.fields.image.name) === 0) {
                        sectionPage.imageDir = image.staticURL;
                      }
                    });
                  } else {
                    sectionPage.imageName = null;
                  }
                }
              });
            }
          });
        });
      }
    });

    /* Creates variable allPageNameHeader for all possible pages in the header menu
    *  Structured as [PAGE NAME, PAGE SLUG]
    */
    const allPageNameHeader = [];
    minimalMainPagesResult.pages.forEach((page) => {
      allPageNameHeader.push([page.name, page.slug]);
    });

    /* Finds header and footer image URLs to populate in each page.
    */
    const headerDir = allImageDataResult.nodes.filter((image) => (image.name)
      .localeCompare(minimalMainPagesResult.headerlogo.name) === 0);
    const footerDir = allImageDataResult.nodes.filter((image) => (image.name)
      .localeCompare(minimalMainPagesResult.footerlogo.name) === 0);

    /* Populated each page with similar header and footer information
    *  Information includes header image, header menu, footer image, and metadata
    */
    minimalMainPagesResult.pages.forEach((page) => {
      page.headerAllPages = allPageNameHeader;
      page.headerDir = headerDir[0].staticURL;
      page.footerDir = footerDir[0].staticURL;
    });

    /* Creates all the pages using pageTemplate.jsx for each page in minimalMainPageResult
    *  Path dictated by slug (home = '/', else path is slug)
    */
    minimalMainPagesResult.pages.forEach((page) => {
      if (page.slug.localeCompare('home') === 0) {
        createPage({
          path: '/',
          component: pageTemplate,
          context: {
            page,
            buildTag: process.env.BUILD_TAG,
          },
        });
      } else if (page.slug.localeCompare('people') === 0) {
        createPage({
          path: '/people',
          component: peopleTemplate,
          context: {
            page,
            slug: 'people',
            channelToken: process.env.CHANNEL_TOKEN,
            buildTag: process.env.BUILD_TAG,
          },
        });
      } else {
        createPage({
          path: `/${page.slug}`,
          component: pageTemplate,
          context: {
            page,
            buildTag: process.env.BUILD_TAG,
          },
        });
      }
    });
  });
};

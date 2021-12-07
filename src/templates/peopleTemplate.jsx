/**
 * Copyright (c) 2021 Oracle and/or its affiliates.
 * Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl.
 */

/* eslint-disable react/prop-types */
/* eslint-disable import/no-absolute-path */
/* eslint-disable import/no-unresolved */
/* eslint-disable global-require */

import React from 'react';
import { Helmet } from 'react-helmet';
import { graphql } from 'gatsby';
import Banner from '../components/Banner';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Person from '../components/Person';

export const query = graphql`query ($slug: String!, $channelToken: String!) { 
  ocm {
    getPeoplePage(
      slug: $slug
      channelToken: $channelToken
    ) {
      id
      slug
      name
      fields {
        announcement {
          id
          fields {
            type: fieldType
            heading
            body
            actions
            image {
              ... on OCM_image {
                id
                name
                fields {
                  renditions {
                    file {
                      url
                    }
                  }
                }
              }
            }
          }
        }
        people {
          id
          fields {
            fullname
            title
            biodata
            file {
              metadata {
                width
                height
              }
            }
            renditions {
              name
              format
              file {
                url
                metadata {
                  height
                  width
                }
              }
            }
          }
        }
      }
    }
  }
}`;

const People = ({ pageContext: { page, buildTag }, data }) => {
  const peopleData = data.ocm.getPeoplePage.fields.people;
  const bannerData = data.ocm.getPeoplePage.fields.announcement.fields;

  const peopleProfiles = [];

  peopleData.forEach((person) => {
    peopleProfiles.push(
      <Person
        image={person.fields.renditions[0].file.url}
        name={person.fields.fullname}
        position={person.fields.title}
        description={person.fields.biodata}
        key={person.fields.fullname}
      />,
    );
  });

  const BUILD_TAG = buildTag || 'none';
  const sdkPackage = require('/node_modules/@oracle/gatsby-source-oce/package.json');
  const SDK_VERSION = sdkPackage.version;

  return (
    <div className="page">
      <Helmet>
        <meta name="description" content="Sample Minimal app created in Gatsby that uses Oracle Content Management" />
        <meta name="BUILD_TAG" content={`${BUILD_TAG}`} />
        <meta name="@oracle/gatsby-source-oce" content={`${SDK_VERSION}`} />
      </Helmet>
      <Header headerImageDir={page.headerDir} headerAllPages={page.headerAllPages} />
      <div>
        <Banner
          image={bannerData.image.fields.renditions[0].file.url}
          title={bannerData.heading}
          text={bannerData.body}
          key={bannerData.id}
        />
      </div>
      <div className="all_people">
        {peopleProfiles}
      </div>
      <Footer footerImageDir={page.footerDir} />
    </div>
  );
};

export default People;

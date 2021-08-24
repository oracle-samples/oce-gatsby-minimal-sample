/**
 * Copyright (c) 2021 Oracle and/or its affiliates.
 * Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl.
 */

/* eslint-disable react/prop-types */
/* eslint-disable no-restricted-syntax */

import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Banner from '../components/Banner';
import MainBody from '../components/MainBody';

const Page = ({ pageContext: { page } }) => {
  /* Create page with sections in @page structure
  *  Dynamically select between announcement with button, without button, or main body
  */
  const sectionItems = [];
  for (const [, value] of page.fields.sections.entries()) {
    if (value.textData.type.localeCompare('announcement') === 0) {
      if (value.textData.actions !== null) { // announcement with a button
        sectionItems.push(<Banner
          image={value.imageDir}
          title={value.textData.heading}
          text={value.textData.body}
          buttonData={{
            url: value.textData.actions[0].link,
            label: value.textData.actions[0].name,
          }}
          key={value.textData.heading}
        />);
      } else { // announcement with no button
        sectionItems.push(<Banner
          image={value.imageDir}
          title={value.textData.heading}
          text={value.textData.body}
          key={value.textData.heading}
        />);
      }
    } else { // main body type
      sectionItems.push(<MainBody
        title={value.textData.heading}
        text={value.textData.body}
        key={value.textData.heading}
      />);
    }
  }

  return (
    <>
      <div className="page">
        <Header headerImageDir={page.headerDir} headerAllPages={page.headerAllPages} />
        <div>
          {sectionItems}
        </div>
        <Footer footerImageDir={page.footerDir} />
      </div>
    </>
  );
};

export default Page;

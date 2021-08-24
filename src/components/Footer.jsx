/**
 * Copyright (c) 2021 Oracle and/or its affiliates.
 * Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl.
 */

/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/alt-text */

import React from 'react';
import facebookImage from '../images/facebook.jpg';
import linkedinImage from '../images/linkedin.jpg';
import twitterImage from '../images/twitter.jpg';
import youtubeImage from '../images/youtube.jpg';

const Footer = ({ footerImageDir }) => (
  <footer>
    <img src={footerImageDir} />
    <div className="social-media-menu">
      <a href="https://www.facebook.com/oracle">
        <img src={facebookImage} alt="Facebook" />
      </a>
      <a href="https://www.linkedin.com/company/oracle">
        <img src={linkedinImage} alt="LinkedIn" />
      </a>
      <a href="https://www.twitter.com/oracle">
        <img src={twitterImage} alt="Twitter" />
      </a>
      <a href="https://www.youtube.com/oracle">
        <img src={youtubeImage} alt="YouTube" />
      </a>
    </div>
  </footer>
);

export default Footer;

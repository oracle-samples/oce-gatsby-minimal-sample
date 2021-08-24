/**
 * Copyright (c) 2021 Oracle and/or its affiliates.
 * Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl.
 */

/* eslint-disable react/no-danger */

import React from 'react';
import PropTypes from 'prop-types';

/* Props should have title and text elements */
const MainBody = ({ title, text }) => (
  <section className="content default">
    <div className="title">{title}</div>
    <div className="text">
      <div dangerouslySetInnerHTML={{ __html: text }} />
    </div>
  </section>
);
MainBody.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default MainBody;

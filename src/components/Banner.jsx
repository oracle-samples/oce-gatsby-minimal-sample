/**
 * Copyright (c) 2021 Oracle and/or its affiliates.
 * Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl.
 */

/* eslint-disable react/no-danger */
/* eslint-disable jsx-a11y/img-redundant-alt */

import React from 'react';
import PropTypes from 'prop-types';

function displayButton({ url, label }) {
  if ((url == null) || (label == null)) {
    return '';
  }
  return <a className="button" href={url}>{label}</a>;
}
displayButton.defaultProps = {
  url: null,
  label: null,
};
displayButton.propTypes = {
  url: PropTypes.string,
  label: PropTypes.string,
};

const Banner = ({
  image, title, text, buttonData,
}) => (
  <section className="content announcement">
    <img src={image} alt="Banner Image" />
    <div>
      <div className="title">{title}</div>
      <div className="text"><p dangerouslySetInnerHTML={{ __html: text }} /></div>
      <div>
        {displayButton(buttonData)}
      </div>
    </div>
  </section>
);

Banner.defaultProps = {
  buttonData: {
    url: null,
    label: null,
  },
};

Banner.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  buttonData:
  PropTypes.shape({ url: PropTypes.string, label: PropTypes.string }),
};

export default Banner;

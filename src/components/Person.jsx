/**
 * Copyright (c) 2021 Oracle and/or its affiliates.
 * Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl.
 */

/* eslint-disable react/no-danger */

import React from 'react';
import PropTypes from 'prop-types';

/* Props should have title and text elements */
const Person = ({
  image, name, position, description,
}) => (
  <section className="person">
    <img src={image} alt="PersonImage" className="profile_picture" />
    <div className="profile">
      <div className="profile_name">{name}</div>
      <div className="profile_position">{position}</div>
      <div className="profile_description">
        <div dangerouslySetInnerHTML={{ __html: description }} />
      </div>
    </div>
  </section>
);
Person.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default Person;

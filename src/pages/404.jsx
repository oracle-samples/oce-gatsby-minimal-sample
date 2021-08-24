/**
 * Copyright (c) 2021 Oracle and/or its affiliates.
 * Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl.
 */

import React from 'react';
import { Link } from 'gatsby';

export default function error() {
  return (
    <div className="error">
      <h1>Error!</h1>
      <p>Sorry, the item you are requesting has not been found.</p>
      <Link to="/">Click here to go to the main page</Link>
    </div>
  );
}

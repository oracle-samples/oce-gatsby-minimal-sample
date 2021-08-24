/**
 * Copyright (c) 2021 Oracle and/or its affiliates.
 * Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl.
 */

/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/alt-text */

import React, { useState } from 'react';
import { Link } from 'gatsby';

let activePage = '/';

const Header = ({ headerImageDir, headerAllPages }) => {
  const [elementClass, setElementClass] = useState('');

  /* Show/hide the drop down menu in narrow screens when the
  *  button is clicked and update the button styling.
  */
  function onDropDownMenuButtonClicked() {
    setElementClass(elementClass.length === 0 ? 'active' : '');
  }

  /* Handle an item being clicked on from the menu */
  function onMenuItemClicked(slug) {
    setElementClass('');
    activePage = slug;
  }

  /* Create menu items and paths */
  const pageItems = [];
  headerAllPages.forEach((page) => {
    if (page[0].localeCompare('Home') === 0) {
      pageItems.push(
        <li key={page[0]}>
          <Link
            onClick={() => onMenuItemClicked('/')}
            to="/"
            className={activePage === '/' ? 'active' : ''}
          >
            Home
          </Link>
        </li>,
      );
    } else {
      pageItems.push(
        <li key={page[0]}>
          <Link
            onClick={() => onMenuItemClicked(`/${page[1]}`)}
            to={`/${page[1]}`}
            className={activePage === `/${page[1]}` ? 'active' : ''}
          >
            {page[0]}
          </Link>
        </li>,
      );
    }
  });

  return (
    <header>
      <img src={headerImageDir} />
      <nav>
        <button type="button" className={elementClass} onClick={(event) => onDropDownMenuButtonClicked(event.target)}>☰</button>
        <ul className={elementClass}>
          {pageItems}
        </ul>
      </nav>
    </header>
  );
};

export default Header;

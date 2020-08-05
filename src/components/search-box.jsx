import React from 'react';
import algoliasearch from 'algoliasearch';
import PropTypes from 'prop-types';

import { InstantSearch, SearchBox } from 'react-instantsearch-dom';
import webComponent from '../web-component';

const searchClient = algoliasearch('H897LKXYG1', '50a4f124e0d934cac92e79ece376316a');

const SearchBox = () => (
  <InstantSearch searchClient={searchClient} indexName="election">
    <SearchBox className="searchbar" />
  </InstantSearch>
)

export default webComponent(SearchBox, 'search-box');
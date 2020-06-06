import React from 'react';
import webComponent from '../web-component';

import algoliasearch from 'algoliasearch'
import { InstantSearch, SearchBox, Hits } from 'react-instantsearch-dom';

const searchClient = algoliasearch('H897LKXYG1', '50a4f124e0d934cac92e79ece376316a');

class SearchQuery extends React.Component {
  render() {
    console.log('searchQuery rendering!');
    return (
      <InstantSearch searchClient={searchClient} indexName="election">
        <SearchBox />
        <Hits />
      </InstantSearch>
    );
  }
};

export default webComponent(SearchQuery, 'search-query');
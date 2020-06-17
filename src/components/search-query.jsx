import React from 'react';
import webComponent from '../web-component';

import algoliasearch from 'algoliasearch'
import { RefinementList, InstantSearch, SearchBox, Hits } from 'react-instantsearch-dom';

const searchClient = algoliasearch('H897LKXYG1', '50a4f124e0d934cac92e79ece376316a');

class SearchQuery extends React.Component {
  render() {
    console.log('searchQuery rendering!');
    return (
      <InstantSearch searchClient={searchClient} indexName="election">
        <div className='left-panel'>
          <h3> Election Title </h3>
          <RefinementList attribute="election_title"/>
          <h3> Election Date </h3>
          <RefinementList attribute="election_date"/>
          <h3> Election Location </h3>
          <RefinementList attribute="election_location"/>
        </div>
        <div className='right-panel'>
            <SearchBox />
            <Hits />
        </div>
      </InstantSearch>
    );
  }
};

export default webComponent(SearchQuery, 'search-query');
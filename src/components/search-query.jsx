import React from 'react';
import webComponent from '../web-component';

import algoliasearch from 'algoliasearch'
import { RefinementList, InstantSearch, SearchBox, Hits } from 'react-instantsearch-dom';

const searchClient = algoliasearch('H897LKXYG1', '50a4f124e0d934cac92e79ece376316a');

const hitComponent = ({ hit }) => {
  return (
    <div>
      <p><strong>Ballot Measure:</strong> {hit.title}</p>
      <p><strong>Election date:</strong> {hit.election_date}</p>
      <p><strong>Location:</strong> {hit.election_location}</p>
      <p><strong>Election title:</strong> {hit.election_title}</p>
      <p><strong>Election type:</strong> {hit.election_type}</p>
    </div>
  )
}

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
            <SearchBox className='searchbar'/>
            <Hits hitComponent={hitComponent}/>
        </div>
      </InstantSearch>
    );
  }
};

export default webComponent(SearchQuery, 'search-query');
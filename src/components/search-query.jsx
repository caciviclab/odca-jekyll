import React from 'react';
import algoliasearch from 'algoliasearch';
import PropTypes from 'prop-types';

import { RefinementList, InstantSearch, SearchBox, Hits } from 'react-instantsearch-dom';
import webComponent from '../web-component';

const searchClient = algoliasearch('H897LKXYG1', '50a4f124e0d934cac92e79ece376316a');

const hitComponent = ({ hit }) => (
  <div>
    { hit.last_name ?
      <div><strong>Contributor:</strong> {hit.first_name} {hit.last_name}</div> : ''
    }
    <strong>Election:</strong> {hit.election_title}<br />
    { hit.title ? <div><strong>Ballot Measure:</strong> {hit.title}</div> : ''}
    { hit.name ?
      <div><strong>Candidate:</strong>
        <a href={`/candidate/${hit.election_location}/${hit.election_date}/\
          ${hit.candidate_slug}`}
        >
          {hit.name}
        </a>
      </div>
     : ''
    }
    { hit.office_title ?
      <div>
        <strong>Office:</strong> {hit.office_title}
      </div> : ''
    }
    { hit.amount ? <div><strong>Amount:</strong> ${hit.amount}</div> : ''}
    <strong>Election date:</strong> {hit.election_date}<br />
    <strong>Location:</strong> {hit.election_location}<br />
  </div>
);

class SearchQuery extends React.Component {
  render() {
    console.log('searchQuery rendering!');
    return (
      <InstantSearch searchClient={searchClient} indexName="election">
        <div className="left-panel">
          <h3> Election Title </h3>
          <RefinementList attribute="election_title" />
          <h3> Election Date </h3>
          <RefinementList attribute="election_date" />
          <h3> Election Location </h3>
          <RefinementList attribute="election_location" />
        </div>
        <div className="right-panel">
          <SearchBox className="searchbar" />
          <Hits hitComponent={hitComponent} />
        </div>
      </InstantSearch>
    );
  }
}

export default webComponent(SearchQuery, 'search-query');

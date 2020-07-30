import React from 'react';
import algoliasearch from 'algoliasearch';
import PropTypes from 'prop-types';

import { RefinementList, InstantSearch, SearchBox, Hits, ClearRefinements, Pagination } from 'react-instantsearch-dom';
import webComponent from '../web-component';

const searchClient = algoliasearch('H897LKXYG1', '50a4f124e0d934cac92e79ece376316a');

const HitComponent = ({ hit }) => (
  <div>
    { hit.last_name ?
      <div>
        <strong>Contributor:</strong> {hit.first_name} {hit.last_name}
      </div>
      : ''
    }
    <div>
      <strong>Election: </strong>
      <a href={`/election/${hit.election_location.toLowerCase()}/${hit.election_date}`} >
        {hit.election_title}
      </a>
    </div>
    { hit.committee_name ?
      <div>
        <strong>Committee: </strong>
        <a href={`/committee/${hit.committee_id}`} >
          {hit.committee_name}
        </a>
      </div>
      : ''
    }
    { hit.title ?
      <div>
        { hit.supporting ?
          <strong>{hit.supporting} </strong>
          : ''
        }
        { hit.measure ? <strong>{hit.measure} -  </strong>
          : <strong>Ballot Measure: </strong>
        }
        <a href={`/referendum/${hit.election_location.toLowerCase()}/${hit.election_date}/${hit.slug}`} >
          {hit.title}
        </a>
      </div>
      : ''
    }
    { hit.name ?
      <div>
        <strong>Candidate: </strong>
        <a href={`/candidate/${hit.election_location.toLowerCase()}/${hit.election_date}/${hit.candidate_slug}`} >
          {hit.name}
        </a>
      </div>
      : ''
    }
    { hit.office_title ?
      <div>
        <strong>Office: </strong>
        <a href={`/office/${hit.election_location.toLowerCase()}/${hit.election_date}/${hit.office_slug}`} >
          {hit.office_title}
        </a>
      </div> : ''
    }
    { hit.amount ?
      <div>
        <strong>Amount:</strong> ${hit.amount}
      </div>
      : ''
    }
    <div> <strong>Election date:</strong> {hit.election_date} </div>
    <div> <strong>Location:</strong> {hit.election_location} </div>
  </div>
);
HitComponent.propTypes = {
  hit: PropTypes.shape({
    last_name: PropTypes.string,
    first_name: PropTypes.string,
    election_title: PropTypes.string,
    election_location: PropTypes.string,
    election_date: PropTypes.string,
    name: PropTypes.string,
    committee_name: PropTypes.string,
    committee_id: PropTypes.string,
    supporting: PropTypes.string,
    measure: PropTypes.string,
    title: PropTypes.string,
    amount: PropTypes.number,
    slug: PropTypes.string,
    candidate_slug: PropTypes.string,
    office_slug: PropTypes.string,
    office_title: PropTypes.string,
  }),
};
HitComponent.defaultProps = {
  hit: {},
};

const SearchQuery = () => (
  <InstantSearch searchClient={searchClient} indexName="election">
    <div className="grid">
      <div className="grid-col-2 election-checkboxes">
        <ClearRefinements clearsQuery="true" />
        <h3>Election Title</h3>
        <RefinementList attribute="election_title" />
      </div>
      <div className="grid-col-10">
        <SearchBox className="searchbar" />
        <Hits hitComponent={HitComponent} />
        <Pagination />
        <a href="https://www.algolia.com">Search by Algolia</a>
      </div>
    </div>
  </InstantSearch>
);

export default webComponent(SearchQuery, 'search-query');

import React from 'react';
import algoliasearch from 'algoliasearch';
import PropTypes from 'prop-types';

import {
  RefinementList, InstantSearch, SearchBox, ClearRefinements, Pagination,
  connectHits, PoweredBy, connectStateResults,
} from 'react-instantsearch-dom';
import webComponent from '../web-component';

const searchClient = algoliasearch('H897LKXYG1', '50a4f124e0d934cac92e79ece376316a');

const Hits = ({ hits }) => (
  <dl>
    {hits.map(hit => (
      <div>
        { hit.last_name ?
          <dt>
            <strong>Contributor:</strong> {hit.first_name} {hit.last_name}
          </dt>
          : ''
        }
        <dd>
          <strong>Election: </strong>
          <a href={`/election/${hit.election_location.toLowerCase()}/${hit.election_date}`} target="_blank" rel="noreferrer" >
            {hit.election_title}
          </a>
        </dd>
        { hit.committee_name ?
          <dd>
            <strong>Committee: </strong>
            <a href={`/committee/${hit.committee_id}`} target="_blank" rel="noreferrer" >
              {hit.committee_name}
            </a>
          </dd>
          : ''
        }
        { hit.title ?
          <dd>
            { hit.supporting ?
              <strong>{hit.supporting} </strong>
              : ''
            }
            { hit.measure ? <strong>{hit.measure} -  </strong>
              : <strong>Ballot Measure: </strong>
            }
            <a href={`/referendum/${hit.election_location.toLowerCase()}/${hit.election_date}/${hit.slug}`} target="_blank" rel="noreferrer" >
              {hit.title}
            </a>
          </dd>
          : ''
        }
        { hit.office_title ?
          <dd>
            <strong>Office: </strong>
            <a href={`/office/${hit.election_location.toLowerCase()}/${hit.election_date}/${hit.office_slug}`} target="_blank" rel="noreferrer" >
              {hit.office_title}
            </a>
          </dd> : ''
        }
        { hit.name ?
          <dd>
            { hit.supporting ?
              <strong>{hit.supporting} </strong>
              : ''
            }
            <strong>Candidate: </strong>
            <a href={`/candidate/${hit.election_location.toLowerCase()}/${hit.election_date}/${hit.candidate_slug}`} target="_blank" rel="noreferrer" >
              {hit.name}
            </a>
          </dd>
          : ''
        }
        { hit.amount ?
          <dd>
            <strong>Amount:</strong> ${hit.amount}
          </dd>
          : ''}
        <dd> <strong>Election date:</strong> {hit.election_date} </dd>
        <dd> <strong>Location:</strong> {hit.election_location} </dd>
        <hr />
      </div>
    ))}
  </dl>
);

const CustomHits = connectHits(Hits);

Hits.propTypes = {
  hits: PropTypes.shape({
    map: PropTypes.string,
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

Hits.defaultProps = {
  hits: {},
};

const Results = connectStateResults(({ searchState }) =>
  (searchState && searchState.query ? (
    <div>
      <CustomHits />
    </div>
  ) : (
    <div>No query</div>
  )));

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
        <PoweredBy />
        <Results />
        <Pagination />
      </div>
    </div>
  </InstantSearch>
);

export default webComponent(SearchQuery, 'search-query');

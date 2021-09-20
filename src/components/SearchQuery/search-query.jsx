import React from 'react';
import algoliasearch from 'algoliasearch';
import {
  InstantSearch, SearchBox, ClearRefinements, Pagination,
  PoweredBy, connectStateResults,
} from 'react-instantsearch-dom';
import CustomHits from './hits';
import ElectionsFilter from './elections-filter';
import webComponent from '../../web-component';

const searchClient = algoliasearch('H897LKXYG1', '50a4f124e0d934cac92e79ece376316a');

const Results = connectStateResults(({ searchState }) =>
  (searchState && searchState.query ? (
    <div>
      <CustomHits />
      <Pagination />
    </div>
  ) : (
    <div> </div>
  )));

const SearchQuery = () => (
  <InstantSearch searchClient={searchClient} indexName="election">
    <div className="grid">
      <div className="grid-col-2 election-checkboxes">
        <ClearRefinements clearsQuery="true" />
        <h3>Filter by election</h3>
        <ElectionsFilter />
      </div>
      <div className="grid-col-10">
        <SearchBox className="searchbar" />
        <PoweredBy />
        <Results />
      </div>
    </div>
  </InstantSearch>
);

export default webComponent(SearchQuery, 'search-query');

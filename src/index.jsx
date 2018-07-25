/* globals document */
import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import ContributionsTable from './components/contributions-table';

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');
  ReactDOM.render(<Root />, root);

  const contributionsTable = document.getElementById('react-contributions');
  if (contributionsTable) {
    const contributions = JSON.parse(contributionsTable.getAttribute('data-contributions'));
    ReactDOM.render(<ContributionsTable contributions={contributions} />, contributionsTable);
  }
});

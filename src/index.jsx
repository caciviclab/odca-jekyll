/* globals document */
import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';

// We need to include our components so they are included in the bundle
import './components/contributions-table';

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');
  ReactDOM.render(<Root />, root);
});

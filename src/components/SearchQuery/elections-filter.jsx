import React from 'react';
import { RefinementList } from 'react-instantsearch-dom';
import { orderBy, map } from 'lodash';
import { date } from '../../format';

const ElectionsFilter = () => (
  <RefinementList
    attribute="election_date"
    transformItems={items => map(orderBy(items, i => i.label, 'desc'), item => ({
          ...item,
          label: date('MMMM D, YYYY', item.label),
        }))}
  />
);

export default ElectionsFilter;

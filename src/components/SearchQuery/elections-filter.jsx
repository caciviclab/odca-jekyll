import React from 'react';
import { RefinementList } from 'react-instantsearch-dom';
import { orderBy, map } from 'lodash';
import { date } from '../../format';

const ElectionsFilter = () => (
  <RefinementList
    attribute="election_date"
    transformItems={(items) => {
        // Override items label value to show formatted date
        const formattedItems = map(items, item => ({
          ...item,
          label: date('MMMM D, YYYY', item.label),
        }));
        // Parse date to get UTC value and order the list of elections by it
        return orderBy(formattedItems, i => Date.parse(i.label), 'desc');
      }
    }
  />
);

export default ElectionsFilter;

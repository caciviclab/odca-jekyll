import React from 'react';
import { RefinementList } from 'react-instantsearch-dom';
import { orderBy } from 'lodash';

const Elections = () => (
  <RefinementList
    attribute="election_title"
    /* List refinements ordered by date descending */
    transformItems={items =>
      orderBy(items, (i) => {
        /* extract the election date */
        const d = i.label.match(/^[^ ]* (.*, [^ ]*)/);
        if (d) {
          /* remove th, st, rd, etc from the day */
          const r = d['1'].replace(/[^[0-9]*,/, ',');
          return Date.parse(r);
        }
        /* if we can't extrat a date, put it last */
        return 0;
      }, 'desc')
    }
  />
);

export default Elections;

import React from 'react';
import PropTypes from 'prop-types';
import { connectHits, Highlight } from 'react-instantsearch-dom';

// function FormatHit(props) {
//   return (
//     <div>
//       <strong>{props.title}</strong>
//       { props.link || (
//       <a href={props.link} target="_blank" rel="noreferrer" >
//         <Highlight attribute={props.field1} hit={props.hit} />
//         <Highlight attribute={props.field2} hit={props.hit} />
//       </a>)}
//     </div>
//   );
// }

const elementAttributeLookup = {
  first_name: 'Contributor',
  election_title: 'Election',
  committee_name: 'Committee',
  measure: 'Measure',
  office_title: 'Office',
  name: 'Candidate',
  amount: 'Amount',
  election_date: 'Election date',
  election_location: 'Location',
};

// function composeHref(linkType, { election_location, election_date, committee_dd, slug }) {
//   return linkType === 'committee'
//     ? `/${linkType}/${committee_id}`
//     : `/${linkType}/${election_location.toLowerCase()}/${election_date}/${slug}`;
// }

// function LinkableHighlight(attribute, hit) {
//   const notLinkable = ['amount', 'election_date', 'election_location']
//   return (
//     notLinkable.indexOf(attribute) === -1
//       ?
//         <a href="/">
//           <Highlight attribute={attribute} hit={hit} />
//         </a>
//       : <Highlight attribute={attribute} hit={hit} />
//   );
// }

const Hits = ({ hits }) => (
  <dl className="hit-list">
    {hits.map(hit => (
      <div key={`${hit.objectID}_${Math.floor(Math.random() * 1e10)}`}>
        {Object.keys(hit).map(attribute => (
          elementAttributeLookup.indexOf(attribute) !== -1 &&
          <dd key={`${attribute}_${Math.floor(Math.random() * 1e10)}`}>
            <strong>{elementAttributeLookup[attribute]}</strong>
          </dd>
        ))}
      </div>
    ))}
  </dl>
);

const CustomHits = connectHits(Hits);
export default CustomHits;

Hits.propTypes = {
  hits: PropTypes.arrayOf(PropTypes.shape({
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
  })),
};

Hits.defaultProps = {
  hits: [],
};

import React from 'react';
import PropTypes from 'prop-types';
import { connectHits, Highlight } from 'react-instantsearch-dom';

function RefHighlight(props) {
  if (props.link) {
    return (
      <a href={props.link} target="_blank" rel="noreferrer" >
        <Highlight attribute={props.attribute} hit={props.hit} />
      </a>
    );
  }
  return <Highlight attribute={props.attribute} hit={props.hit} />;
}

RefHighlight.propTypes = {
  link: PropTypes.string,
  attribute: PropTypes.string,
  hit: PropTypes.shape().isRequired,
};
RefHighlight.defaultProps = {
  link: '',
  attribute: '',
};

function FormatHit(props) {
  return (
    <span>
      {props.title && <strong>{props.title}: </strong>}
      {props.symbol}<RefHighlight attribute={props.field1} link={props.link} hit={props.hit} />
      &nbsp;
      {props.field2 && <RefHighlight
        attribute={props.field2}
        link={props.link}
        hit={props.hit}
      />
      }
    </span>
  );
}

FormatHit.propTypes = {
  title: PropTypes.string,
  symbol: PropTypes.string,
  field1: PropTypes.string,
  field2: PropTypes.string,
  link: PropTypes.string,
  hit: PropTypes.shape().isRequired,
};

FormatHit.defaultProps = {
  title: '',
  symbol: '',
  field1: '',
  field2: '',
  link: '',
};
function makeLink(type, location, date, slug) {
  return `/${type}/${location.toLowerCase()}/${date}/${slug}`;
}

const Hits = ({ hits }) => (
  <dl className="hit-list">
    {hits.map(hit => (
      <div>
        {hit.last_name &&
          <dt>
            <FormatHit hit={hit} title="Contributor" field1="first_name" field2="last_name" />
          </dt>
        }
        <dd>
          <FormatHit
            hit={hit}
            title="Election"
            field1="election_title"
            link={makeLink('election', hit.election_location, hit.election_date, '')}
          />
        </dd>
        {hit.committee_name &&
          <dd>
            <FormatHit
              hit={hit}
              title="Committee"
              field1="committee_name"
              link={makeLink('committee', '', '', hit.committee_id)}
            />
          </dd>
        }
        {hit.title &&
          <dd>
            <strong> {hit.supporting} </strong>
            {hit.measure ?
              <strong><Highlight attribute="measure" hit={hit} /> - </strong>
              : <strong>Ballot Measure: </strong>
            }
            <FormatHit
              hit={hit}
              field1="title"
              link={makeLink('referendum', hit.election_location, hit.election_date, hit.slug)}
            />
          </dd>
        }
        {hit.office_title &&
          <dd>
            <FormatHit
              hit={hit}
              title="Office"
              field1="office_title"
              link={makeLink('office', hit.election_location, hit.election_date, hit.office_slug)}
            />
          </dd>
        }
        {hit.name &&
          <dd>
            <strong>{hit.supporting} </strong>
            <FormatHit
              hit={hit}
              title="Candidate"
              field1="name"
              link={makeLink('candidate', hit.election_location, hit.election_date, hit.candidate_slug)}
            />
          </dd>
        }
        {hit.amount &&
          <dd>
            <FormatHit hit={hit} title="Amount" field1="amount" symbol="$" />
          </dd>
        }
        <dd> <FormatHit hit={hit} title="Election date" field1="election_date" /> </dd>
        <dd> <FormatHit hit={hit} title="Location" field1="election_location" /> </dd>
        <hr />
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

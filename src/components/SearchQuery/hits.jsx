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
      {props.symbol}<RefHighlight attribute={props.field} link={props.link} hit={props.hit} />
    </span>
  );
}

FormatHit.propTypes = {
  title: PropTypes.string,
  symbol: PropTypes.string,
  field: PropTypes.string.isRequired,
  link: PropTypes.string,
  hit: PropTypes.shape().isRequired,
};

FormatHit.defaultProps = {
  title: '',
  symbol: '',
  link: '',
};
function makeLink(type, location, date, slug) {
  return `/${type}/${location.toLowerCase()}/${date}/${slug}`;
}

const Hits = ({ hits }) => (
  <dl className="hit-list">
    {hits.map(hit => (
      <div key={hit.objectID}>
        {hit.c_name && hit.type !== 'donation' &&
          <dd>
            <FormatHit hit={hit} title="Contributor" field="c_name" />
          </dd>
        }
        {hit.election_title &&
          <dd>
            <FormatHit
              hit={hit}
              title="Election"
              field="election_title"
              link={makeLink('election', hit.election_location, hit.election_date, '')}
            />
          </dd>
        }
        {hit.committee_name &&
          <dd>
            <FormatHit
              hit={hit}
              title="Committee"
              field="committee_name"
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
              field="title"
              link={makeLink('referendum', hit.election_location, hit.election_date, hit.slug)}
            />
          </dd>
        }
        {hit.name &&
          <dd>
            <strong>{hit.supporting} </strong>
            <FormatHit
              hit={hit}
              title={hit.type === 'donation' ? 'Requestor' : 'Candidate'}
              field="name"
              link={hit.type === 'donation' ? null :
                makeLink('candidate', hit.election_location, hit.election_date, hit.candidate_slug)}
            />
          </dd>
        }
        {hit.office_title &&
          <dd>
            <FormatHit
              hit={hit}
              title="Office"
              field="office_title"
              link={hit.type === 'donation' ? null :
                makeLink('office', hit.election_location, hit.election_date, hit.office_slug)}
            />
          </dd>
        }
        {hit.c_name && hit.type === 'donation' &&
          <dd>
            <FormatHit hit={hit} title="Requested Donation of" field="c_name" />
            &nbsp;
            <FormatHit hit={hit} title="In" field="location" />
          </dd>
        }
        {hit.payee &&
          <dd>
            <FormatHit hit={hit} title="Recipeint" field="payee" />
          </dd>
        }
        {hit.date &&
          <dd>
            <FormatHit hit={hit} title="Date" field="date" />
          </dd>
        }
        {hit.description &&
          <dd>
            <FormatHit hit={hit} title="Purpose" field="description" link={hit.url} />
          </dd>
        }
        {hit.amount &&
          <dd>
            <FormatHit hit={hit} title="Amount" field="amount" symbol="$" />
          </dd>
        }
        {hit.election_date &&
          <dd>
            <FormatHit
              hit={hit}
              title={hit.type === 'donation' ? 'Date' : 'Election date'}
              field="election_date"
            />
          </dd>
        }
        {hit.election_location &&
          <dd> <FormatHit hit={hit} title="Location" field="election_location" /> </dd>
        }
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
    c_name: PropTypes.string,
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

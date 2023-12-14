import React from 'react';
import PropTypes from 'prop-types';

import { day, dollars } from '../format';
import webComponent from '../web-component';


function name(contribution) {
  return [contribution.Tran_NamF, contribution.Tran_NamL]
    .filter(v => !!v)
    .join(' ');
}

class ContributionsTable extends React.Component {
  static initialState(contributions, iec) {
    return {
      contributions: contributions.map((contribution, i) => ({
        id: i,
        name: name(contribution),
        type: contribution.Entity_Cd || '',
        occupation: contribution.Tran_Occ || '',
        employer: contribution.Tran_Emp || '',
        zip: contribution.Tran_Zip4,
        amount: contribution.Tran_Amt1,
        date: new Date(contribution.Tran_Date),
        election_name: contribution.election_name || '',
        title: contribution.title || '',
      })),
      sortOnElectionName: iec,
      sortElectionNameOrder: -1,
      filter: '',
      // Initial state is sorting by amount, "ascending", note that the columns
      // have different definitions of ascending/descending, see `applySortOrder`
      // below.
      sort: {
        order: 1,
        column: 'amount',
      },
      iec,
    };
  }

  /**
   * Parses HTML attributes to props
   */
  static parseAttributes(attributes) {
    const contributions = JSON.parse(attributes.contributions ?
      attributes.contributions.value : []);
    const iec = attributes.iec.value === 'true';
    return {
      contributions, iec,
    };
  }

  constructor(props) {
    super(props);
    this.state = ContributionsTable.initialState(props.contributions, props.iec);
  }

  /**
   * applyFilter
   *
   * Applies the filter text against the contributions names and returns only
   * the contributions that match the filter. Names and the filter are
   * tokenized (broken by white-space and normalized) before being matched. For
   * example, given the filter 'reb kap', should match the contribution name
   * 'Rebecca Kaplan'.
   *
   * @param {array} contributions the source array of contributions.
   * @returns {array} the contributions matching the filter.
   */
  applyFilter(contributions) {
    const { filter } = this.state;
    if (!filter) {
      return contributions;
    }

    function tokenize(data) {
      // Lowercases everything and split by white-space
      return data.toLowerCase().split(/\s+/g);
    }

    return contributions
      .filter((contribution) => {
        const tokens = tokenize(contribution.name)
          .concat(tokenize(contribution.employer))
          .concat(tokenize(contribution.occupation))
          .concat(String(contribution.zip))
          .concat(String(contribution.amount));
        const queries = tokenize(filter);

        // Every query needs to match at least one token. It's considered a
        // match when the query matches the first part of the token.
        return queries.every(query =>
          tokens.some(token => token.startsWith(query)));
      });
  }

  updateSortOrder(e) {
    const value = JSON.parse(e.target.value);
    this.setState(() => (
      {
        sort: {
          order: value.order,
          column: value.column,
        },
      }
    ));
  }

  applySortOrder(contributions) {
    const { sort, sortOnElectionName, sortElectionNameOrder } = this.state;

    const codepointCompare = (x, y) => {
      // sort falsey values to the bottom, rather than to the top
      const [a, b] = [x || '\uffff', y || '\uffff'];

      if (a > b) return 1;
      else if (a < b) return -1;
      return 0;
    };

    const parseElectionName = (input) => {
      const [ename, ...rest] = input.split('-');

      if (rest.length === 1) {
        // If there is only one element after the split, assume it's the year
        return { ename, month: 'november', year: rest[0] };
      } else if (rest.length >= 2) {
        // If there are two or more elements, assume the last is the year
        // and the second-to-last is the month
        return { ename, month: rest[rest.length - 2], year: rest[rest.length - 1] };
      }
      // Handle the case where there are no elements after the split
      return { ename, month: 'november', year: undefined };
    };

    const electionCompare = (x, y) => {
      const election1 = parseElectionName(x);
      const election2 = parseElectionName(y);

      // we don't need to sort on name beause, while its unlikely to have
      // two jurisdictions for the same IEC, we want the contributions sorted
      // by date.
      if (election1.year > election2.year) {
        return 1;
      }
      if (election1.year < election2.year) {
        return -1;
      }

      const monthOrder = {
        january: 0,
        february: 1,
        march: 2,
        april: 3,
        may: 4,
        june: 5,
        july: 6,
        august: 7,
        september: 8,
        october: 9,
        november: 10,
        december: 11,
      };

      return monthOrder[election1.month] - monthOrder[election2.month];
    };

    const difference = (a, b) => {
      if (sortOnElectionName && a.election_name !== b.election_name) {
        return electionCompare(a.election_name, b.election_name) * sortElectionNameOrder;
      }
      // We're doing some funkiness with ascending/decsending based on the
      // column to give a _maybe_ more intuitive behavior. The default sort is
      // ascending, but if you sort by amount, you probably want that to start in
      // descending order, so a/b are swapped. Similar with date, where you
      // want to see the recent contributions for the initial sort.
      switch (sort.column) {
        case 'amount':
          return b.amount - a.amount;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'type':
          return codepointCompare(a.type, b.type);
        case 'occupation':
          return codepointCompare(a.occupation, b.occupation);
        case 'employer':
          return codepointCompare(a.employer, b.employer);
        case 'date':
          return b.date.valueOf() - a.date.valueOf();
        case 'zip':
          return +(b.zip.replace('-', '').padEnd(9, '0')) - +(a.zip.replace('-', '').padEnd(9, '0'));
        default:
          return 0;
      }
    };

    return contributions
      .map(x => x) // Create a new array to avoid sort mutating the state
      .sort((a, b) => sort.order * difference(a, b));
  }

  render() {
    const { contributions } = this.state;
    const { iec } = this.state;

    const maybeReturnEmptyCell = (contribution, key) => {
      const baseClass = 'contributors__cell';
      const [classList, display] = contribution[key]
        ? [baseClass, contribution[key]]
        : [`${baseClass} contributors__empty-cell`, '—'];

      return <td className={classList}>{ display }</td>;
    };

    const sortToggle = column => () => {
      const currentSort = this.state.sort;
      const electionNameOrder = this.state.sortElectionNameOrder;
      if (column === 'election_name') {
        this.setState({
          sortElectionNameOrder: electionNameOrder * -1,
        });
        return;
      }
      if (currentSort.column === column) {
        // Already sorting on this column, toggle the order
        this.setState({
          sort: {
            column,
            order: currentSort.order * -1,
          },
          sortElectionNameOrder: electionNameOrder * -1,
        });
        return;
      }

      // Set the new sort column in the ascending state
      this.setState({
        sort: {
          column,
          order: 1,
        },
      });
    };

    const isActive = (colName) => {
      const currentSort = this.state.sort;
      if (this.state.sort.column !== colName) {
        return '';
      } else if (currentSort.order === 1) {
        return ' is-descending';
      }
      return ' is-ascending';
    };

    const updateFilter = (e) => {
      this.setState({
        filter: e.target.value,
      });
    };

    return (
      <div>
        <input className="filter" value={this.state.filterField} onChange={updateFilter} type="text" placeholder="Type to filter contributions" />
        { iec &&
          <label htmlFor="ename">
            <input
              id="ename"
              type="checkbox"
              checked={this.state.sortOnElectionName}
              onChange={() =>
                this.setState(prevState => ({
                  sortOnElectionName: !prevState.sortOnElectionName,
                }))
              }
            />
            Sort by Election Name
          </label>
        }
        <select className="contributors__sort-select" defaultValue={'{ "column": "amount", "order": 1}'} onChange={e => this.updateSortOrder(e)}>
          <option value={'{ "column": "name", "order": 1}'}>Name (A-Z)</option>
          <option value={'{ "column": "name", "order": -1}'}>Name (Z-A)</option>
          <option value={'{ "column": "type", "order": 1}'}>Contributor type (A-Z)</option>
          <option value={'{ "column": "type", "order": -1}'}>Contriubtor type (Z-A)</option>
          <option value={'{ "column": "amount", "order": 1}'}>Amount (high to low)</option>
          <option value={'{ "column": "amount", "order": -1}'}>Amount (low to high)</option>
          <option value={'{ "column": "date", "order": -1}'}>Date (first to last)</option>
          <option value={'{ "column": "date", "order": 1}'}>Date (last to first)</option>
        </select>
        <table className="contributors">
          <thead className="contributors__thead">
            <tr>
              { iec &&
                <th className={`contributors__heading contributors__election_name${isActive('election_name')}`}>
                  <button type="button" className="sort-button" onClick={sortToggle('election_name')}>
                    Election Name
                    <span className="arrow-container" />
                  </button>
                </th>
              }
              <th className={`contributors__heading contributors__name${isActive('name')}`}>
                <button type="button" className="sort-button" onClick={sortToggle('name')}>
                  Name
                  <span className="arrow-container" />
                </button>
              </th>
              <th className={`contributors__heading contributors__type${isActive('type')}`}>
                <button type="button" className="sort-button" onClick={sortToggle('type')}>
                  Contributor type
                  <span className="arrow-container" />
                </button>
              </th>
              <th className={`contributors__heading contributors__occupation${isActive('occupation')}`}>
                <button type="button" className="sort-button" onClick={sortToggle('occupation')}>
                  Occupation
                  <span className="arrow-container" />
                </button>
              </th>
              <th className={`contributors__heading contributors__employer${isActive('employer')}`}>
                <button type="button" className="sort-button" onClick={sortToggle('employer')}>
                  Employer
                  <span className="arrow-container" />
                </button>
              </th>
              <th className={`contributors__heading contributors__zip${isActive('zip')}`}>
                <button type="button" className="sort-button" onClick={sortToggle('zip')}>
                  ZIP code
                  <span className="arrow-container" />
                </button>
              </th>
              <th className={`contributors__heading contributors__amount${isActive('amount')}`}>
                <button type="button" className="sort-button" onClick={sortToggle('amount')}>
                  Amount
                  <span className="arrow-container" />
                </button>
              </th>
              <th className={`contributors__heading contributors__date contributors__col--s1${isActive('date')}`}>
                <button type="button" className="sort-button" onClick={sortToggle('date')}>
                  Date
                  <span className="arrow-container" />
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {
              this.applySortOrder(this.applyFilter(contributions)).map(contribution => (
                <tr key={contribution.id}>
                  { iec &&
                    <td className="contributors__cell contributors__election_name">
                      {contribution.title}
                    </td>
                  }
                  <td className="contributors__cell contributors__name">
                    {contribution.name}
                    <div className="contributors__card">
                      <div className="contributors__card-row">
                        <span className="contributors__card-type">{ contribution.type }</span>
                        <span className="contributors__card-amount">{ `$${contribution.amount}` }</span>
                      </div>
                      <div className="contributors__card-row">
                        <span className="contributors__card-zip">Zip code: { contribution.zip }</span>
                        <span className="contributors__card-date">{ day(contribution.date) }</span>
                      </div>
                      <div
                        className="contributors__card-occupation contributors__card-employer"
                      >{ contribution.occupation || '' }{ contribution.employer ? `, ${contribution.employer}` : '' }
                      </div>
                    </div>
                  </td>
                  { maybeReturnEmptyCell(contribution, 'type') }
                  { maybeReturnEmptyCell(contribution, 'occupation') }
                  { maybeReturnEmptyCell(contribution, 'employer') }
                  { maybeReturnEmptyCell(contribution, 'zip') }
                  <td className="contributors__cell contributors__amount">{dollars(contribution.amount)}</td>
                  <td className="contributors__cell contributors__date contributors__col--s1">{day(contribution.date)}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    );
  }
}

ContributionsTable.propTypes = {
  contributions: PropTypes.arrayOf(PropTypes.shape({
    Tran_Amt1: PropTypes.number.isRequired,
    Tran_Date: PropTypes.string.isRequired,
    Tran_NamL: PropTypes.string.isRequired,
    Tran_NamF: PropTypes.string,
  })),
  iec: PropTypes.bool,

};

ContributionsTable.defaultProps = {
  contributions: [],
  iec: false,
};


export default webComponent(ContributionsTable, 'contributions-table');

import React from 'react';
import PropTypes from 'prop-types';

import { day, dollars } from '../format';

function name(contribution) {
  return [contribution.Tran_NamF, contribution.Tran_NamL]
    .filter(v => !!v)
    .join(' ');
}

class ContributionsTable extends React.Component {
  static initialState(contributions) {
    return {
      contributions: contributions.map((contribution, i) => ({
        id: i,
        name: name(contribution),
        amount: contribution.Tran_Amt1,
        date: new Date(contribution.Tran_Date),
      })),
      // Initial state is sorting by amount, "ascending", note that the columns
      // have different definitions of ascending/descending, see `applySortOrder`
      // below.
      sort: {
        order: 1,
        column: 'amount',
      },
    };
  }

  constructor(props) {
    super(props);
    this.state = ContributionsTable.initialState(props.contributions);
  }

  applySortOrder(contributions) {
    const { sort } = this.state;
    function difference(a, b) {
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
        case 'date':
          return b.date.valueOf() - a.date.valueOf();
        default:
          return 0;
      }
    }

    return contributions
      .map(x => x) // Create a new array to avoid sort mutating the state
      .sort((a, b) => sort.order * difference(a, b));
  }

  render() {
    const { contributions } = this.state;
    const sortToggle = column => () => {
      const currentSort = this.state.sort;
      if (currentSort.column === column) {
        // Already sorting on this column, toggle the order
        this.setState({
          sort: {
            column,
            order: currentSort.order * -1,
          },
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

    return (
      <table className="contributors">
        <thead className="contributors__thead">
          <tr>
            <td className="contributors__name"><button onClick={sortToggle('name')}>^</button>Name</td>
            <td className="contributors__amount"><button onClick={sortToggle('amount')}>^</button>Amount</td>
            <td className="contributors__date contributors__col--s1"><button onClick={sortToggle('date')}>^</button>Date</td>
          </tr>
        </thead>
        <tbody>
          {
            this.applySortOrder(contributions).map(contribution => (
              <tr key={contribution.id}>
                <td className="contributors__name">{contribution.name}</td>
                <td className="contributors__amount">{dollars(contribution.amount)}</td>
                <td className="contributors__date contributors__col--s1">{day(contribution.date)}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
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
};

ContributionsTable.defaultProps = {
  contributions: [],
};


export default ContributionsTable;

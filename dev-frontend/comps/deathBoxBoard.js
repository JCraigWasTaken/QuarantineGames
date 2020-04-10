import React from 'react';
import Card from '../comps/card.js';

class DeathBoxBoard extends React.Component {
  constructor(props) {
    super(props);
  }

  getRows = () => {
    let numRows = this.props.cards.length;
    let rows = [];

    for (let i = 0; i < numRows; i++) {
      rows.push(
        <tr key={i} className='deathBoxBoardRow'>
          {this.getRow(i)}
        </tr>
      );
    }

    return rows;
  }

  getRow = rowNumber => {
    let numCols = this.props.cards[0].length;
    let row = [];
    for (let i = 0; i < numCols; i++) {
      row.push(
        <td className='deathBoxBoardCard rcorners5' key={rowNumber + i}>
          {this.props.cards[rowNumber][i]}
        </td>
      );
    }
    return row;
  }

  handleCellClick = e => {
    console.log(e);
    console.log(e.target);
  }

  render() {
    return (
      <table>
        <tbody>
          {this.getRows()}
        </tbody>
      </table>
    );
  }
}

export default DeathBoxBoard;

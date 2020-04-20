import React from 'react';
import Pile from '../comps/pile.js';

class DeathBoxBoard extends React.Component {
  constructor(props) {
    super(props);
  }

  getRows = () => {
    let numRows = this.props.piles.length;
    let rows = [];

    for (let i = 0; i < numRows; i++) {
      rows.push(
        <tr
          key={i} >
          {this.getRow(i)}
        </tr>
      );
    }

    return rows;
  }

  getRow = rowNumber => {
    let numCols = this.props.piles[0].length;
    let row = [];
    for (let i = 0; i < numCols; i++) {
      row.push(
        <td
          onClick={this.handleCellClick}
          key={rowNumber + i}
          id={rowNumber + '~' + i}>
            <Pile 
              cards={this.props.piles[rowNumber][i].cards} 
              id={rowNumber + '~' + i}
              handlePileClick={this.handlePileClick}/>
        </td>
      );
    }
    return row;
  }

  handlePileClick = id => {
    let idComponents = id.split('~');
    let row = idComponents[0];
    let column = idComponents[1];
    this.props.handlePileClick(row, column);
  }

  render() {
    return (
      <table className="deathBoxBoard">
        <tbody>
          {this.getRows()}
        </tbody>
      </table>
    );
  }
}

export default DeathBoxBoard;

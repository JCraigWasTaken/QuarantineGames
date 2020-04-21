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
              handlePileClick={this.handlePileClick}
              showCard={true}
              shadow={this.getPileShadow(this.props.piles[rowNumber][i].cards.length)}/>
        </td>
      );
    }
    return row;
  }

  getPileShadow = numCards => {
    let boxShadowString = '';
    for (let i = 1; i < numCards; i++) {
      boxShadowString += `${i}px ${i}px 0 0 black`;
      if (i !== numCards - 1) {
        boxShadowString += ',';
      }
    }
    return boxShadowString;
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

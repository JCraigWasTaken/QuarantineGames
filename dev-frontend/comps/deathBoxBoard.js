import React from 'react';

class DeathBoxBoard extends React.Component {
  constructor(props) {
    super(props);
  }

  getRows = () => {
    let numRows = this.props.cards.length;
    let rows = [];

    for (let i = 0; i < numRows; i++) {
      rows.push(
        <tr
          className='deathBoxBoardRow'
          key={i} >
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
        <td
          onClick={this.handleCellClick}
          className='deathBoxBoardCard rcorners5'
          key={rowNumber + i}
          id={rowNumber + '~' + i}>
          {this.props.cards[rowNumber][i]}
        </td>
      );
    }
    return row;
  }

  handleCellClick = e => {
    let idComponents = e.currentTarget.id.split('~');
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

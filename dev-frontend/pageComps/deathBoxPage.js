import React from 'react';
import DeathBoxBoard from '../comps/deathBoxBoard.js';
import DeathBoxChoice from '../comps/deathBoxChoice.js';
import DeathBoxPlayers from '../comps/deathBoxPlayers.js';
import Card from '../comps/card.js';
import Pile from '../comps/pile.js';

class DeathBoxPage extends React.Component {
  constructor(props) {
    super(props);

    const availableCards = this.initializeAvailableCards();
    const piles = this.initializePiles(availableCards);
    const passCount = 3;
    this.timer = 0;

    this.state = {
      selectedChoice: 0,
      availableCards: availableCards,
      piles: piles,
      requiredToPass: passCount,
      remainingToPass: passCount,
      choiceMessage: null,
      drinkCount: -1,
      players: [],
      currentPlayer: '',
      getReadyToDrink: false,
      windowWidth: 0,
      windowHeight: 0
    };
  }

  initializeAvailableCards = () => {
    let cards = Card.generateAllCards();
    cards = Card.shuffleCards(cards);
    return cards;
  }

  initializePiles = cards => {
    let piles = [[]];
    const initialSideCount = 4;
    let countToRemove = 0;

    for (let i = 0; i < initialSideCount; i++) {
      piles[i] = [];

      for (let j = 0; j < initialSideCount; j++) {

        let pile = new Pile();
        pile.addCard(cards[initialSideCount * i + j]);
        piles[i].push(pile);
        countToRemove++;
      }
    }

    cards.splice(0, countToRemove);
    return piles;
  }

  getVisibleCards = () => {
    let piles = this.state.piles;
    let visibleCards = [[]];

    for (let i = 0; i < piles.length; i++) {
      visibleCards[i] = [];
      for (let j = 0; j < piles[i].length; j++) {
        visibleCards[i].push(piles[i][j].getTopCard());
      }
    }

    return visibleCards;
  }

  getNextCard = () => {
    let availableCards = this.sate.availableCards.slice();
    return availableCards.splice(0, 1);
  }


  handleChoiceClick = choice => {
    let selectedChoice = this.state.selectedChoice;
    if (selectedChoice === choice) {
      choice = 0;
    }

    this.setState({
      selectedChoice: choice
    });
  }

  handlePileClick = (row, column) => {
    const selectedComparison = this.state.selectedChoice;
    if (selectedComparison === 0) {
      return;
    }

    let availableCards = this.state.availableCards.slice();
    let piles = this.state.piles;

    // Determine whether or not to drink and for how long
    const drinkResults = this.checkDrinks(row, column, selectedComparison, availableCards, piles);

    // Update player drink count
    const players = this.updateDrinkCount(drinkResults['count']);

    // Check if pile reorganization is required
    piles = this.reorganizePiles(availableCards, piles);

    const nextPlayer = this.setNextPlayer(drinkResults['remainingToPass']);

    // Update number of correct answers required in a row to pass
    const passingResults = this.updatePassingRequirements(piles, drinkResults['remainingToPass']);

    this.setState({
      selectedChoice: 0,
      choiceMessage: drinkResults['message'],
      piles: piles,
      availableCards: availableCards,
      drinkCount: drinkResults['count'],
      getReadyToDrink: true,
      requiredToPass: passingResults['required'],
      remainingToPass: passingResults['remaining'],
      players: players,
      currentPlayer: nextPlayer
    });
  }

  updateDrinkCount = count => {
    let players = this.state.players.slice();
    if (count > 0) {
      let currentPlayer = this.state.currentPlayer;
      const player = players.findIndex(p => p.name === currentPlayer);
      players[player].drinks += count;
    }
    return players;
  }

  setNextPlayer = drinksRemaining => {
    const players = this.state.players.slice();
    let player = this.state.currentPlayer;

    if (drinksRemaining <= 0) {
      // find current index
      let index = players.findIndex(p => p.name === player);

      // get next player
      index = index + 1 >= players.length ? 0 : index + 1;
      player = players[index].name;
    }

    return player;
  }

  updatePassingRequirements = (piles, remainingToPass) => {
    let requiredToPass = this.state.requiredToPass;
    if (piles.length < requiredToPass) {
      requiredToPass = piles.length;
    }
    if (piles[0].length < requiredToPass) {
      requiredToPass = piles[0].length;
    }

    if (remainingToPass > requiredToPass || remainingToPass <= 0) {
      remainingToPass = requiredToPass;
    }

    return {
      'remaining': remainingToPass,
      'required': requiredToPass
    }
  }

  checkDrinks = (row, column, selectedComparison, availableCards, piles) => {
    const requiredToPass = this.state.requiredToPass;
    let remainingToPass = this.state.remainingToPass;
    const pile = piles[row][column];
    const topCard = pile.getTopCard();

    const nextAvailableCard = availableCards[0];
    const comparison = Card.compareCards(nextAvailableCard, topCard);

    pile.addCard(nextAvailableCard);
    piles[row][column] = pile;
    availableCards.splice(0, 1);
    let count = pile.getHeight();

    let message;
    if (comparison === 0) {
      count = 2 * count;
      message = 'Oops, on the post...';
      remainingToPass = requiredToPass;
    } else if (comparison === selectedComparison) {
      count = -1;
      message = 'Correct!';
      remainingToPass -= 1;
    } else {
      message = 'Nope.';
      remainingToPass = requiredToPass;
    }

    return {
      'message': message,
      'count': count,
      'remainingToPass': remainingToPass
    };
  }

  reorganizePiles = (availableCards, piles) => {
    const requiredToPass = this.state.requiredToPass;
    if (availableCards.length >= requiredToPass) {
      return piles;
    }

    const numRows = piles.length;
    const numColumns = piles[0].length;
    let directionToRemove;

    // 1 - Remove a Row
    // 2 - Remove a Column
    // 0 - Remove either
    if (numRows > numColumns) {
      directionToRemove = 1;
    } else if (numRows < numColumns) {
      directionToRemove = 2;
    } else {
      directionToRemove = 0;
    }

    let largestRow = this.getLargestRow(piles);
    let largestColumn = this.getLargestColumn(piles);
    let newPiles = [];

    if (directionToRemove === 1 || largestRow['count'] >= largestColumn['count'] && directionToRemove === 0) {
      for (let i = 0; i < numRows; i++) {
        if (i !== largestRow['index']) {
          newPiles.push(piles[i]);
        } else {
          for (let j = 0; j < numColumns; j++) {
            availableCards.push(...piles[i][j].getCards());
          }
        }
      }

    } else {
      let newRow;
      for (let i = 0; i < numRows; i++) {
        newRow = [];
        for (let j = 0; j < numColumns; j++) {
          if (j !== largestColumn['index']) {
            newRow.push(piles[i][j]);
          } else {
            availableCards.push(...piles[i][j].getCards());
          }
        }
        newPiles.push(newRow);
      }
    }

    return newPiles;
  }

  getLargestRow = piles => {
    let rowCount;
    let largestRowCount = 0;
    let largestRow = 0;
    for (let i = 0; i < piles.length; i++) {
      rowCount = this.getRowCount(piles[i]);
      if (rowCount > largestRowCount) {
        largestRowCount = rowCount;
        largestRow = i;
      }
    }
    return {
      'index': largestRow,
      'count': largestRowCount
    };
  }

  getRowCount = row => {
    let count = 0;
    for (let i = 0; i < row.length; i++) {
      count += row[i].getHeight();
    }
    return count;
  }

  getLargestColumn = piles => {
    let columnCount;
    let largestColumnCount = 0;
    let largestColumn = 0;
    for (let i = 0; i < piles[0].length; i++) {
      columnCount = this.getColumnCount(piles, i);
      if (columnCount > largestColumnCount) {
        largestColumnCount = columnCount;
        largestColumn = i;
      }
    }
    return {
      'index': largestColumn,
      'count': largestColumnCount
    };
  }

  getColumnCount = (piles, columnNumber) => {
    let count = 0;
    for (let i = 0; i < piles.length; i++) {
      count += piles[i][columnNumber].getHeight();
    }
    return count;
  }

  handleTimerClick = () => {
    this.setState({
      getReadyToDrink: false
    });

    let drinkCount = this.state.drinkCount;
    if (this.timer == 0 && drinkCount > 0) {
      this.timer = setInterval(this.countdown, 1000);
    }
  }

  countdown = () => {
    let drinkCount = this.state.drinkCount;
    let message = this.state.choiceMessage;
    if (drinkCount === 0) {
      clearInterval(this.timer);
      this.timer = 0;
      message = '';
    }

    this.setState({
      drinkCount: drinkCount - 1,
      choiceMessage: message
    });
  }

  handleAddPlayerClick = player => {
    let players = this.state.players.slice();
    players.push({
      'name': player,
      'drinks': 0
    });

    let currentPlayer = this.state.currentPlayer === '' ? player : this.state.currentPlayer;
    this.setState({
      players: players,
      currentPlayer: currentPlayer
    });
  }

  handleRemovePlayerClick = player => {
    let players = this.state.players.slice();
    const index = players.findIndex(p => p.name === player);
    players.splice(index, 1);

    const currentPlayer = this.state.currentPlayer === player ? players[index].name : this.state.currentPlayer;
    this.setState({
      players: players,
      currentPlayer: currentPlayer
    });
  }

  handleBabyClick = () => {
    console.log('Im a baby.');
    const player = this.setNextPlayer(0);
    this.setState({
      currentPlayer: player
    })
  }

  componentDidMount() {
      this.updateWindowDimensions();
      window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
      window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
      this.setState({ windowWidth: window.innerWidth, windowHeight: window.innerHeight });
  }

  render() {
    return (
      <div className="deathBox">
        <DeathBoxBoard
          cards={this.getVisibleCards()}
          handlePileClick={this.handlePileClick} />
        <DeathBoxChoice
          readyToPlay={this.state.players.length >= 2}
          selectedButton={this.state.selectedChoice}
          handleChoiceClick={this.handleChoiceClick}
          handleTimerClick={this.handleTimerClick}
          drinkCount={this.state.drinkCount}
          getReadyToDrink={this.state.getReadyToDrink}
          remainingToPass={this.state.remainingToPass}
          message={this.state.choiceMessage} />
        <DeathBoxPlayers
          players={this.state.players}
          currentPlayer={this.state.currentPlayer}
          onAddPlayerClick={this.handleAddPlayerClick}
          onRemovePlayerClick={this.handleRemovePlayerClick}
          onBabyClick={this.handleBabyClick} />
      </div>
    );
  }
}

export default DeathBoxPage;

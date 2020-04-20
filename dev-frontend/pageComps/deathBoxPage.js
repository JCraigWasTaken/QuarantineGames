import React from 'react';
import DeathBoxBoard from '../comps/deathBoxBoard.js';
import DeathBoxChoice from '../comps/deathBoxChoice.js';
import DeathBoxDisclaimer from '../comps/deathBoxDisclaimer.js';
import DeathBoxHowToPlay from '../comps/deathBoxHowToPlay.js';
import DeathBoxPlayers from '../comps/deathBoxPlayers.js';
import Card from '../comps/card.js';
import GameOver from '../comps/gameOver.js';

class DeathBoxPage extends React.Component {
  constructor(props) {
    super(props);

    const availableCards = this.initializeAvailableCards();
    const piles = this.initializePiles(availableCards);
    const passCount = 3;
    this.timer = 0;

    this.state = {
      firstLoad: true,
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
      windowHeight: 0,
      gameOver: false,
      showHowToPlay: false
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
        piles[i].push({
          'cards': [cards[initialSideCount * i + j]]
        });
        countToRemove++;
      }
    }

    cards.splice(0, countToRemove);
    return piles;
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

    // check if game over
    const gameOver = this.gameOver(availableCards, piles);

    let nextPlayer;
    let passingResults;

    if (!gameOver) {
      // Check if pile reorganization is required
      piles = this.reorganizePiles(availableCards, piles);

      // Update current player
      nextPlayer = this.setNextPlayer(drinkResults['remainingToPass']);

      // Update number of correct answers required in a row to pass
      passingResults = this.updatePassingRequirements(piles, drinkResults['remainingToPass']);
    } else {
      nextPlayer = this.state.currentPlayer;
      passingResults = {
        'required': 0,
        'remaining': 0
      };
    }

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
      currentPlayer: nextPlayer,
      gameOver: gameOver
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
    const topCard = pile.cards[0];

    const nextAvailableCard = availableCards[0];
    const comparison = Card.compareCards(nextAvailableCard, topCard);

    pile.cards.unshift(nextAvailableCard);
    piles[row][column] = pile;
    availableCards.splice(0, 1);
    let count = pile.cards.length;

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

  gameOver = (availableCards, piles) => {
    if (availableCards.length === 0 && piles.length === 1 && piles[0].length === 1) {
      return true;
    }
    return false;
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
            availableCards.push(...piles[i][j].cards);
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
            availableCards.push(...piles[i][j].cards);
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
      count += row[i].cards.length;
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
      count += piles[i][columnNumber].cards.length;
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
    if (players.filter(p => p.name === player).length > 0) {
      return;
    }

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

    console.log(player);
    console.log(this.state.currentPlayer);
    console.log(index);

    let currentPlayer = this.state.currentPlayer;
    // if removing current player
    if (currentPlayer === player) {
      // if there are still players remaining
      if (players.length > 0) {
        // if removed last player
        if (index >= players.length) {
          currentPlayer = players[0].name;
        } else {
          currentPlayer = players[index].name;
        }
      } else {
        currentPlayer = '';
      }
    }

    this.setState({
      players: players,
      currentPlayer: currentPlayer
    });
  }

  handleBabyClick = () => {
    if (this.state.drinkCount >= 0) {
      return;
    }
    
    const player = this.setNextPlayer(0);
    const requiredToPass = this.state.requiredToPass;
    this.setState({
      currentPlayer: player,
      remainingToPass: requiredToPass
    });
  }

  handlePlayAgainClick = () => {
    console.log('Play Again!');
    const availableCards = this.initializeAvailableCards();
    const piles = this.initializePiles(availableCards);
    const passCount = 3;
    this.timer = 0;

    this.setState({
      selectedChoice: 0,
      availableCards: availableCards,
      piles: piles,
      requiredToPass: passCount,
      remainingToPass: passCount,
      choiceMessage: null,
      drinkCount: -1,
      getReadyToDrink: false,
      gameOver: false
    });
  }

  handleHowToPlayClick = () => {
    this.setState({
      showHowToPlay: true
    });
  }

  handleCloseHowToPlayClick = () => {
    this.setState({
      showHowToPlay: false
    });
  }

  handleCloseDisclaimerClick = () => {
    this.setState({
      firstLoad: false
    })
  }

  componentDidMount() {
      this.updateWindowDimensions();
      window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
      window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions = () => {
      this.setState({
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight
      });
  }

  render() {
    return (
      <div className="deathBox">
        {this.state.firstLoad && <DeathBoxDisclaimer close={this.handleCloseDisclaimerClick} />}
        {this.state.showHowToPlay && <DeathBoxHowToPlay close={this.handleCloseHowToPlayClick} />}
        {this.state.gameOver && this.state.drinkCount < 0 && <GameOver finished={this.handleFinishedClick} newGame={this.handlePlayAgainClick}/>}
        <DeathBoxBoard
          piles={this.state.piles}
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
          onBabyClick={this.handleBabyClick}
          onHowToPlayClick={this.handleHowToPlayClick} />
      </div>
    );
  }
}

export default DeathBoxPage;

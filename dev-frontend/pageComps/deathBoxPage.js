const React = require('react');
import DeathBoxBoard from '../comps/deathBoxBoard.js';
import DeathBoxChoice from '../comps/deathBoxChoice.js';
import Card from '../comps/card.js';
import Pile from '../comps/pile.js';

class DeathBoxPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedChoice: '',
      availableCards: null,
      piles: null,
      choiceMessage: ''
    };

    this.initializeAvailableCards();
    this.initializePiles();
  }

  initializeAvailableCards = () => {
    let cards = Card.generateAllCards();
    cards = Card.shuffleCards(cards);
    this.state = {
      availableCards: cards
    };
  }

  initializePiles = () => {
    let availableCards = this.state.availableCards.slice();
    let piles = [[]];
    let squareSize = 4;
    let countToRemove = 0;

    for (let i = 0; i < squareSize; i++) {
      piles[i] = [];

      for (let j = 0; j < squareSize; j++) {

        let pile = new Pile();
        pile.addCard(availableCards[squareSize*i + j]);
        piles[i].push(pile);
        countToRemove++;
      }
    }

    availableCards.splice(0, countToRemove);

    this.state = {
      availableCards: availableCards,
      piles: piles
    };
  }

  getVisibleCards = () => {
    let piles = this.state.piles;
    console.log(piles);
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
      choice = '';
    }

    this.setState({
      selectedChoice: choice
    });
  }

  handlePileClick = (row, column) => {
    let selectedChoice = this.state.selectedChoice;
    let selectedComparison;
    if (selectedChoice === '') {
      return;
    } else {
      selectedComparison = selectedChoice === 'Higher' ? 1 : -1;
    }

    let piles = this.state.piles;
    let pile = piles[row][column];
    let topCard = pile.getTopCard();

    let availableCards = this.state.availableCards.slice();
    let nextAvailableCard = availableCards[0];

    let comparison = Card.compareCards(topCard, nextAvailableCard);

    pile.addCard(nextAvailableCard);
    piles[row][column] = pile;
    availableCards.splice(0, 1);
    let count = pile.getHeight();

    let message;
    if (comparison === 0) {
      message = `On the post! Drink for a count of ${2 * count}.`;
    } else if (comparison === selectedComparison) {
      message = 'Correct!';
    } else {
      message = `Drink for a count of ${count}.`;
    }

    this.setState({
      selectedChoice: '',
      choiceMessage: message,
      piles: piles,
      availableCards: availableCards
    });
  }

  sleep = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

  render() {
    let visibleCards = this.getVisibleCards();
    let selectedChoice = this.state.selectedChoice;
    let choiceMessage = this.state.choiceMessage;

    return (
      <div className="deathBox">
        <DeathBoxBoard
          cards={visibleCards}
          handlePileClick={this.handlePileClick} />
        <DeathBoxChoice
          selectedButton={selectedChoice}
          handleChoiceClick={this.handleChoiceClick}
          message={choiceMessage} />
      </div>
    );
  }
}

export default DeathBoxPage;

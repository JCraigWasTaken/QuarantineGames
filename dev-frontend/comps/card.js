import React from 'react';
import Club from '../media/club.png';
import Diamond from '../media/diamond.png';
import Heart from '../media/heart.png';
import Spade from '../media/spade.png';

class Card extends React.Component {
  constructor(props) {
    super(props);
  }

  static generateAllCards = handleClick => {
    let suits = ['spade', 'club', 'heart', 'diamond'];
    let numbers = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    let cards = [];
    for (let i = 0; i < suits.length; i++) {
      for (let j = 0; j < numbers.length; j++) {
        cards.push(<Card suit={suits[i]} number={numbers[j]} row={i} column={j} handleClick={handleClick} />);
      }
    }
    return cards;
  }

  static shuffleCards = cards => {
    let shuffledCards = [];
    let nextCardIndex;
    let cardsLength = cards.length;
    for (let i = 0; i < cardsLength; i++) {
      nextCardIndex = Math.floor(Math.random() * cards.length);
      shuffledCards.push(cards[nextCardIndex]);
      cards.splice(nextCardIndex, 1);
    }
    return shuffledCards;
  }

  static compareCards = (card1, card2) => {
    let card1Value = this.getCardValue(card1);
    let card2Value = this.getCardValue(card2);

    if (card1Value > card2Value) {
      return 1;
    } else if (card1Value < card2Value) {
      return -1;
    } else {
      return 0;
    }
  }

  static getCardValue = card => {
    let value;
    let number = card.props.number;
    if (number === 'A') {
      value = 1;
    } else if (number === 'J') {
      value = 11;
    } else if (number === 'Q') {
      value = 12;
    } else if (number === 'K') {
      value = 13;
    } else {
      value = parseInt(number);
    }
    return value;
  }

  getSuit = () => {
    let suit = this.props.suit;
    if (suit === 'club') {
      return Club;
    } else if (suit === 'diamond') {
      return Diamond;
    } else if (suit === 'heart') {
      return Heart;
    } else if (suit === 'spade') {
      return Spade;
    }
  }

  getColour = () => {
    let suit = this.props.suit;
    if (suit === 'heart' || suit === 'diamond') {
      return 'red';
    } else if (suit === 'club' || suit === 'spade') {
      return 'black';
    }
  }

  render() {
    let number = this.props.number;
    let suit = this.getSuit();
    let colour = this.getColour();

    return (
      <div>
          <div>
            <img src={suit} className='suit' id='topleft'/>
          </div>
          <div>
            <h1 className={'number ' + colour}>{number}</h1>
          </div>
          <div>
            <img src={suit} className='suit' id='bottomright'/>
          </div>
      </div>
    )
  }
}


export default Card;

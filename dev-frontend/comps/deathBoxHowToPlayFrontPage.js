import React from 'react';

class DeathBoxHowToPlayFrontPage extends React.Component {
  constructor(props) {
        super(props);
  }

  render() {
    return (
        <div>
            <p className='justified'>
                This game can have any amount of players. The game starts with a grid made of 4 rows of 4 cards laid out in front of you. You must guess higher or lower for any card face up in the grid. Once you guess, a card is pulled from the deck and placed on top of the card in the grid. If you guess incorrectly, you must drink an amount of drinks equivalent to the pile size underneath the card you picked and you must go again. If you do not want to do that, you can hit the baby button and you are out of the game. If you guess correctly 3 times in a row (or 2 times once the grid is 2x2) your turn is over. Once the deck is completely dealt out, the row or column with the highest number of cards gets reshuffled into a new deck. The game ends once the deck of card is complete, or if everyone has hit the baby button.
            </p>
        </div>
    );
  }
}

export default DeathBoxHowToPlayFrontPage;
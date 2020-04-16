import React from 'react';
import Baby from '../media/crying-baby.png';

class DeathBoxHowToPlay extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='big-popup'>
        <div className='popup-content'>
          <div>
            <h1 className='center'>Welcome to Death Box</h1>
          </div>
          <div>
            <h2 className='left'>How it Works</h2>
            <p className='justified'>
              The point of the game is to correctly guess whether the next card in the deck is going to be higher or lower than your chosen spot on the board.
              If you get the required number of guesses right, your turn is over. If you guess wrong, you drink. A lot.
              You drink for the number of seconds that there are cards in the pile you chose.
            </p>
            <div className='spacing'/>
            <h2 className='left'>How to Play</h2>
            <p className='justified'>
              First things first. On the right side, add some players. Once you've added everyone, it's player 1's turn.
              Player 1 should choose Higher or Lower, and then click a pile. The next card in the deck will appear on the pile they selected.
              If they were right, they guess again until they've guessed correctly the required number of times.
              If they guess wrong, they drink. And then they start their guesses again.
            </p>
            <div className='spacing'/>
            <h2 className='left'>Bonus Details</h2>
            <ul>
              <li>For some added fun, if the next card in the deck is the same as the one on top of the pile, your drink count is doubled.</li>
              <li>If you're a baby and want your turn to end, you can click the <img src={Baby} className='cryingBabyImage'/> button to skip to the next person.</li>
              <li>When there are no more cards in the deck, the board will rearrange to be smaller, and add more cards to the deck.</li>
              <li>The game is over when everyone is being a baby, or there are no more cards in the deck.</li>
            </ul>
          </div>
          <div className='center'>
            <button type='button' className='submitButton' onClick={this.props.close}>Thanks, I get it</button>
          </div>
        </div>
      </div>
    );
  }
}

// <p>The point of the game is to correctly guess whether the next card in the deck is going to be higher or lower than your chosen spot on the board.</p>
// <p>If you get the required number of guesses right, your turn is over. If you guess wrong, you drink. A lot.</p>
// <p>You drink for the number of seconds that there are cards in the pile you chose.</p>

// <p>First things first. On the right side, add some players. Once you've added everyone, it's player 1's turn.</p>
// <p>Player 1 should choose click Higher or Lower, and then click a pile. The next card in the deck will appear on the pile they selected.</p>
// <p>If they were right, they guess again until they've guessed correctly the required number of times.</p>
// <p>If they guess wrong, they drink. And then they start their guesses again.</p>

// <p>For some added fun, if the next card in the deck is the same as the one on top of the pile, your drink count is doubled.</p>
// <p>If you're a baby and want your turn to end, you can click the "I'm a Baby" button to skip to the next person.</p>
// <p>When there are no more cards in the deck, the board will rearrange to be smaller, and add more cards to the deck.</p>
// <p>The game is over when everyone is being a baby, or there are no more cards in the deck.</p>

export default DeathBoxHowToPlay;

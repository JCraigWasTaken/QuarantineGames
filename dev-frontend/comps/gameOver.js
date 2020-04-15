import React from 'react';

class GameOver extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='small-popup'>
        <div className='popup-content center'>
          <h1>Game Over</h1>
          <h2>I'm impressed you made it this far. Up for another round?</h2>
          <button type='button' className='submitButton' onClick={this.props.newGame}>Another!</button>
        </div>
      </div>
    );
  }
}

export default GameOver;

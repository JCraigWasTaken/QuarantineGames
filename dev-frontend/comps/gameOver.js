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
          <div className='spacing' />
          <h2 className='justified'>I'm impressed you made it this far. Interested in another round?</h2>
          <div className='spacing' />
          <a href={window.location.href.substring(0, window.location.href.lastIndexOf('/'))} className='submitButton'>Get me out of here.</a>
          <button type='button' className='submitButton' onClick={this.props.newGame}>Another!</button>
        </div>
      </div>
    );
  }
}

export default GameOver;

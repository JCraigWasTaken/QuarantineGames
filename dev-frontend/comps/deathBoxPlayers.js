import React from 'react';
import Remove from '../media/remove.png';
import RightArrow from '../media/right-arrow.png';
import Baby from '../media/crying-baby.png';

class DeathBoxPlayers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newPlayer: '',
      showHowToPlay: false
    };
  }

  handleAddPlayerClick = e => {
    e.preventDefault();
    let newPlayer = this.state.newPlayer.toString().trim();
    if (newPlayer !== '') {
      this.props.onAddPlayerClick(newPlayer);
      this.setState({
        newPlayer: ''
      });
    }
  }

  handleNewPlayerChange = e => {
    this.setState({
      newPlayer: e.target.value
    });
  }

  handleRemovePlayerClick = e => {
    let player = e.currentTarget.id;
    this.props.onRemovePlayerClick(player);
  }

  handleBabyClick = () => {
    this.props.onBabyClick();
  }

  getPlayers = () => {
    const players = this.props.players;
    let playerElements = [];
    for (let i = 0; i < players.length; i++) {
      playerElements.push(
        <tr className='player-row' id={players[i].name} key={players[i].name}>
          <td className='smallImageColumn'>
            {players[i].name === this.props.currentPlayer && <img src={RightArrow} className='currentPlayerImage'/>}
          </td>
          <td className='textColumn left'>
            <p>{players[i].name}</p>
          </td>
          <td className='textColumn center'>
            <p>{players[i].drinks}</p>
          </td>
          <td className='imageColumn' onClick={this.handleBabyClick}>
            {players[i].name === this.props.currentPlayer && <img src={Baby} className='cryingBabyImage'/>}
          </td>
          <td
            id={players[i].name}
            className='imageColumn'
            onClick={this.handleRemovePlayerClick} >
            <img src={Remove} className='removeImage' />
          </td>
        </tr>
      );
    }
    if (playerElements.length === 0) {
      return playerElements;
    } else {
      return (
        <table className='playersTable'>
          <thead>
            <tr>
              <th className='smallImageColumn'></th>
              <th className='center'>Players</th>
              <th className='center'>Drinks</th>
              <th className='imageColumn'>Baby</th>
              <th className='imageColumn'>Kick</th>
            </tr>
          </thead>
          <tbody>
            {playerElements}
          </tbody>
        </table>
      );
    }
  }

  render() {
    return (
      <div className='deathBoxPlayers'>
        <div>
         <button className='submitButton' onClick={this.props.onHowToPlayClick}>What is going on?</button>
        </div>
        {this.props.players.length < 2 &&
          <div>
            <h2>Please add at least 2 players.</h2>
          </div>
        }
        <form className='center' onSubmit={this.handleAddPlayerClick}>
          <button type='submit' className='submitButton'>Add Player</button>
          <input id='newPlayer' value={this.state.newPlayer} onChange={this.handleNewPlayerChange} autoComplete='off'/>
        </form>
        <div>
          {this.getPlayers()}
        </div>
      </div>
    )
  }
}

export default DeathBoxPlayers;

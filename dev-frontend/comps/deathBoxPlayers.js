import React from 'react';
import Remove from '../media/remove.png';
import RightArrow from '../media/right-arrow.png';

class DeathBoxPlayers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newPlayer: ''
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

  getPlayers = () => {
    const players = this.props.players;
    let playerElements = [];
    for (let i = 0; i < players.length; i++) {
      playerElements.push(
        <tr id={players[i].name} key={players[i].name}>
          <td className='currentPlayer'>
            {players[i].name === this.props.currentPlayer ? <img src={RightArrow} className='currentPlayerImage'/> : null}
          </td>
          <td className='player'>
            <p>{players[i].name}</p>
          </td>
          <td className='drinks'>
            <p>{players[i].drinks}</p>
          </td>
          <td
            id={players[i].name}
            className='removePlayer'
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
        <table className='players'>
          <thead>
            <tr>
              <th className='currentPlayer'></th>
              <th className='player'>Players</th>
              <th className='drinks'>Drink Count</th>
              <th></th>
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
    const players = this.getPlayers();

    return (
      <div className='deathBoxPlayers'>
        <form onSubmit={this.handleAddPlayerClick}>
          <button type='submit' className='submitButton'>Add Player</button>
          <input id='newPlayer' value={this.state.newPlayer} onChange={this.handleNewPlayerChange} autoComplete='off'/>
        </form>
        <div>
          {players}
        </div>
        {this.props.players.length >= 2 &&
          <div>
            <button type='button' className='littleSubmitButton' onClick={this.props.onBabyClick}>I'm a baby :(</button>
          </div>
        }
      </div>
    )
  }
}

export default DeathBoxPlayers;

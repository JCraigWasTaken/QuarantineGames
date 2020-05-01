import React from 'react';

class DeathBoxDisclaimer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			room: '',
			name: ''
		};
	}

	handleRoomChange = e => {
		this.setState({
			room: e.target.value
		});
	};

	handleNameChange = e => {
		this.setState({
			name: e.target.value
		});
	};

	handleJoinGameClick = () => {
		this.props.joinGame(this.state.room, this.state.name);
	};

	handleNewGameClick = () => {
		this.props.newGame(this.state.name);
	};

	render() {
		return (
			<div className='small-popup'>
				<div className='popup-content'>
					<div>
						<h2 className='center'>Thanks for playing Death Box!</h2>
					</div>
					<div className='spacing' />
					<div>
						<p className='justified'>
							This is your only warning that you will end up drinking a lot while you play.
							The makers of Death Box aren't going to accept any responsibility for stupid stuff you might say or do while or after playing this game.
							Keep that in mind before you go puke in a friend's bathroom, fall asleep while making a frozen pizza, or crush 30 McNuggets and a large triple-thick milkshake.
							Also, maybe mix in a water at some point. Or don't, I'm not your mom.
						</p>
					</div>
					<div className='center'>
						<input
							value={ this.state.name }
							onChange={ this.handleNameChange }
							placeholder='Name'
						/>
					</div>
					<div className='center'>
						<input
							value={ this.state.room }
							onChange={ this.handleRoomChange }
							placeholder='Room Number'
						/>
						<button
							type='button'
							className='submitButton'
							onClick={ this.handleJoinGameClick }
						>
							Join Game
						</button>
					</div>
					<div className='center'>
						<button
							type='button'
							className='submitButton'
							onClick={ this.handleNewGameClick }
						>
							New Game
						</button>
					</div>
					<div className='center'>
						<h2>{ this.props.message }</h2>
					</div>
				</div>
			</div>
		);
	}
}

export default DeathBoxDisclaimer;

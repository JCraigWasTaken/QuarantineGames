import React from 'react';
import DeathBoxApi from '../src/api/deathBoxApi.js';
import DeathBoxBoard from '../comps/deathBoxBoard.js';
import MultiplayerDeathBoxChoice from '../comps/multiplayerDeathBoxChoice.js';
import MultiplayerDeathBoxCountdown from '../comps/multiplayerDeathBoxCountdown.js';
import DeathBoxMultiplayerStart from '../comps/deathBoxMultiplayerStart.js';
import DeathBoxHowToPlay from '../comps/deathBoxHowToPlay.js';
import MultiplayerDeathBoxPlayers from '../comps/multiplayerDeathBoxPlayers.js';
import GameOver from '../comps/gameOver.js';

class MultiplayerDeathBoxPage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			roomId: null,
			myName: '',
			firstLoad: true,
			joinGameMessage: '',
			selectedChoice: 0,
			availableCards: null,
			piles: null,
			remainingToPass: null,
			choiceMessage: null,
			drinkCount: -1,
			players: [],
			currentPlayer: '',
			getReadyToDrink: false,
			windowWidth: 0,
			windowHeight: 0,
			gameOver: false,
			showHowToPlay: false,
			row: -1,
			column: -1,
			showCard: false,
			countdownPlayer: null
		};

		this.showCardTimer = 0;

		this.deathBoxApi = new DeathBoxApi({
			'createRoom': this.gameCreated,
			'joinRoom': this.gameJoined,
			'updateChoice': this.updatedChoice,
			'pileClicked': this.pileClicked,
			'removePlayer': this.removePlayer,
			'updatePiles': this.updatePiles,
			'countdown': this.countdown
		});
	}

	joinGame = (room, name) => {
		this.setState({
			myName: name
		});

		this.deathBoxApi.joinRoom(room, name);
	};

	gameJoined = game => {
		if (game === 'noGame') {
			this.setState({
				joinGameMessage: `Invalid room number (${room}).`
			});
		} else {
			this.setState({
				firstLoad: false,
				roomId: game.roomId,
				selectedChoice: game.selectedChoice,
				availableCards: game.availableCards.cards,
				piles: game.piles,
				remainingToPass: game.remainingToPass,
				choiceMessage: game.ChoiceMessage,
				drinkCount: game.drinkCount,
				players: game.players,
				currentPlayer: game.currentPlayer.name,
				getReadyToDrink: game.getReadyToDrink,
				gameOver: game.gameOver
			});
		}
	};

	createGame = name => {
		this.setState({
			myName: name
		});
		this.deathBoxApi.createRoom(name);
	};

	gameCreated = game => {
		this.setState({
			firstLoad: false,
			roomId: game.roomId,
			selectedChoice: game.selectedChoice,
			availableCards: game.availableCards.cards,
			piles: game.piles,
			remainingToPass: game.remainingToPass,
			choiceMessage: game.ChoiceMessage,
			drinkCount: game.drinkCount,
			players: game.players,
			currentPlayer: game.currentPlayer.name,
			getReadyToDrink: game.getReadyToDrink,
			gameOver: game.gameOver
		});
	};

	handleChoiceClick = choice => {
		let selectedChoice = this.state.selectedChoice;
		if (selectedChoice === choice) {
			choice = 0;
		}

		this.deathBoxApi.updateChoice(choice, game => this.updateGame(game));
	};

	updatedChoice = game => {
		this.setState({
			selectedChoice: game.selectedChoice,
			choiceMessage: game.choiceMessage
		});
	};

	handlePileClick = (row, column) => {
		const selectedComparison = this.state.selectedChoice;
		if (selectedComparison === 0) {
			return;
		}

		this.deathBoxApi.pileClicked(row, column);
	};

	pileClicked = game => {
		this.setState({
			selectedChoice: game.selectedChoice,
			choiceMessage: game.choiceMessage,
			remainingToPass: game.remainingToPass,
			drinkCount: game.drinkCount,
			getReadyToDrink: game.getReadyToDrink,
			showCard: true,
			currentPlayer: game.currentPlayer.name
		});
	};

	updatePiles = game => {
		this.setState({
			selectedChoice: 0,
			choiceMessage: '',
			showCard: false,
			availableCards: game.availableCards.cards,
			piles: game.piles,
			currentPlayer: game.currentPlayer.name,
			remainingToPass: game.remainingToPass
		});
	};

	handleCloseHowToPlayClick = () => {
		this.setState({
			showHowToPlay: false
		});
	};

	handleHowToPlayClick = () => {
		this.setState({
			showHowToPlay: true
		});
	};

	removePlayer = game => {
		this.setState({
			players: game.players,
			currentPlayer: game.currentPlayer.name
		});
	};

	handleReadyToDrinkClick = () => {
		this.deathBoxApi.readyToDrink();
	};

	handleCountdownClick = () => {
		this.deathBoxApi.countdown();
	};

	countdown = game => {
		this.setState({
			countdownPlayer: game.countdownPlayer,
			drinkCount: game.drinkCount,
			players: game.players
		});
	};

	render() {
		return (
			<div>
				{ this.state.firstLoad &&
					<DeathBoxMultiplayerStart
						joinGame={ this.joinGame }
						newGame={ this.createGame }
						message={ this.state.joinGameMessage }
					/>
				}
				{ this.state.showHowToPlay &&
					<DeathBoxHowToPlay
						close={ this.handleCloseHowToPlayClick }
					/>
				}
				{ this.state.gameOver && this.state.drinkCount < 0 &&
					<GameOver
						finished={ this.handleFinishedClick }
						newGame={ this.handlePlayAgainClick }
					/>
				}
				{ this.state.countdownPlayer === this.state.myName &&
					<MultiplayerDeathBoxCountdown
						handleCountdownClick={ this.handleCountdownClick }
					/>
				}
				{ !this.state.firstLoad &&
					<div className="deathBox">
						<DeathBoxBoard
							piles={ this.state.piles }
							handlePileClick={ this.handlePileClick }
						/>
						<MultiplayerDeathBoxChoice
							readyToPlay={ this.state.players.length >= 2 }
							selectedButton={ this.state.selectedChoice }
							handleChoiceClick={ this.handleChoiceClick }
							handleReadyToDrinkClick={ this.handleReadyToDrinkClick }
							drinkCount={ this.state.drinkCount }
							getReadyToDrink={ this.state.getReadyToDrink }
							remainingToPass={ this.state.remainingToPass }
							message={ this.state.choiceMessage }
							showCard={ this.state.showCard }
							availableCards={ this.state.availableCards }
							currentPlayer={ this.state.currentPlayer }
							isCurrentPlayer={ this.state.myName === this.state.currentPlayer }
						/>
						<MultiplayerDeathBoxPlayers
							roomId={ this.state.roomId }
							players={ this.state.players }
							currentPlayer={ this.state.currentPlayer }
							onRemovePlayerClick={ this.handleRemovePlayerClick }
							onBabyClick={ this.handleBabyClick }
							onHowToPlayClick={ this.handleHowToPlayClick }
						/>
					</div>
				}
			</div>
		);
	}
}

export default MultiplayerDeathBoxPage;
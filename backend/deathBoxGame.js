const Deck = require('./deck.js');

class DeathBoxGame {
	constructor(roomId, player) {
		// Setup room
		this.roomId = roomId;
		this.players = [];
		this.players.push({
			'name': player,
			'numDrinks': 0
		});

		// Setup cards
		this.availableCards = new Deck();
		this.availableCards.shuffle();

		// Setup piles
		this.piles = this.initializePiles();

		// Other setup
		this.currentPlayer = player;
		this.requiredToPass = 3;
		this.remainingToPass = 3;
		this.selectedChoice = 0;
		this.choiceMessage = '';
		this.getReadyToDrink = false;
		this.drinkCount = -1;
		this.gameOver = false;
		this.row = -1;
		this.column = -1;
		this.showCard = false;

	}

	initializePiles() {
		let piles = [[]];
		const initialSideCount = 4;

		for (let i = 0; i < initialSideCount; i++) {
			piles[i] = [];

			for (let j = 0; j < initialSideCount; j++) {
				piles[i].push({
					'cards': [this.availableCards.removeNextCards()]
				});
			}
		}

		return piles;
	}

	addPlayer(player) {
		this.players.push({
			'name': player,
			'numDrinks': 0
		});
	}

	removePlayer(player) {
		let removedPlayer = this.players.find(p => p.name === player);
		this.players.splice(players.indexOf(removedPlayer), 1);

		if (this.currentPlayer === player) {
			let currentIndex = this.players.indexOf(removedPlayer);
			if (currentIndex === this.players.length - 1) {
				this.currentPlayer = this.players[0].name;
			} else {
				this.currentPlayer = this.players[currentIndex].name;
			}
		}
	}

	updateChoice(choice) {
		this.selectedChoice = choice;
		this.choiceMessage = '';
	}

	pileClicked(row, column) {
		const requiredToPass = this.requiredToPass;
		let remainingToPass = this.remainingToPass;
		const pile = this.piles[row][column];
		const topCard = pile.cards[0];

		const nextAvailableCard = this.availableCards.getNextCards();
		const comparison = Deck.compareCards(nextAvailableCard, topCard);
		let count = pile.cards.length + 1;

		let message;
		if (comparison === 0) {
			count = 2 * count;
			message = 'Oops, on the post...';
			remainingToPass = requiredToPass;
		} else if (comparison === this.selectedChoice) {
			count = -1;
			message = 'Correct!';
			remainingToPass -= 1;
		} else {
			message = 'Nope.';
			remainingToPass = requiredToPass;
		}

		this.choiceMessage = message;
		this.drinkCount = count;
		this.remainingToPass = remainingToPass;
		this.getReadyToDrink = count > 0;
		this.showCard = true;
	}
}

module.exports = DeathBoxGame;
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

		this.drinkTimer = 0;

		// Setup cards
		this.availableCards = new Deck();
		this.availableCards.shuffle();

		// Setup piles
		this.piles = this.initializePiles();

		// Other setup
		this.currentPlayer = this.players[0];
		this.requiredToPass = 3;
		this.remainingToPass = 3;
		this.selectedChoice = 0;
		this.choiceMessage = '';
		this.getReadyToDrink = false;
		this.drinkCount = -1;
		this.gameOver = false;
		this.row = -1;
		this.column = -1;
		this.countdownPlayer = null;
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
		this.row = row;
		this.column = column;

		const requiredToPass = this.requiredToPass;
		let remainingToPass = this.remainingToPass;
		const pile = this.piles[this.row][this.column];
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
	}

	updateCurrentPlayer() {
		if (this.remainingToPass === 0) {
			let index = this.players.indexOf(this.currentPlayer);
			if (index === this.players.length - 1) {
				index = -1;
			}
			this.currentPlayer = this.players[index + 1];
			this.remainingToPass = this.requiredToPass;
		}
	}

	updatePiles() {
		this.updateAvailableCards();
		this.updateCurrentPlayer();
		this.rearrangePiles();
		this.selectedChoice = 0;
		if (this.drinkCount < 0) {
			this.choiceMessage = '';
		}
	}

	updateAvailableCards() {
		const nextCard = this.availableCards.removeNextCards();
		let pile = this.piles[this.row][this.column];
		pile.cards.unshift(nextCard);
		this.piles[this.row][this.column] = pile;
		this.row = -1;
		this.column = -1;
	}

	rearrangePiles() {
		if (this.availableCards.cards.length >= this.remainingToPass) {
			return;
		}

		const numRows = this.piles.length;
		const numColumns = this.piles[0].length;
		let directionToRemove;

		// 1 - Remove a Row
		// 2 - Remove a Column
		// 0 - Remove either
		if (numRows > numColumns) {
			directionToRemove = 1;
		} else if (numRows < numColumns) {
			directionToRemove = 2;
		} else {
			directionToRemove = 0;
		}

		let largestRow = this.getLargestRow();
		let largestColumn = this.getLargestColumn();
		let newPiles = [];

		if (directionToRemove === 1 || largestRow.count >= largestColumn.count && directionToRemove === 0) {
			for (let i = 0; i < numRows; i++) {
				if (i !== largestRow.index) {
					newPiles.push(this.piles[i]);
				} else {
					for (let j = 0; j < numColumns; j++) {
						this.availableCards.cards.push(...this.piles[i][j].cards);
					}
				}
			}
			this.row--;
		} else {
			let newRow;
			for (let i = 0; i < numRows; i++) {
				newRow = [];
				for (let j = 0; j < numColumns; j++) {
					if (j !== largestColumn.index) {
						newRow.push(this.piles[i][j]);
					} else {
						this.availableCards.cards.push(...this.piles[i][j].cards);
					}
				}
				newPiles.push(newRow);
			}
			this.column--;
		}

		this.piles = newPiles;
	}

	getLargestRow() {
		let rowCount;
		let largestRowCount = 0;
		let largestRow = 0;
		for (let i = 0; i < this.piles.length; i++) {
			rowCount = this.getRowCount(this.piles[i]);
			if (rowCount > largestRowCount) {
				largestRowCount = rowCount;
				largestRow = i;
			}
		}
		return {
			'index': largestRow,
			'count': largestRowCount
		};
	};

	getRowCount(row) {
		let count = 0;
		for (let i = 0; i < row.length; i++) {
			count += row[i].cards.length;
		}
		return count;
	};

	getLargestColumn() {
		let columnCount;
		let largestColumnCount = 0;
		let largestColumn = 0;
		for (let i = 0; i < this.piles[0].length; i++) {
			columnCount = this.getColumnCount(i);
			if (columnCount > largestColumnCount) {
				largestColumnCount = columnCount;
				largestColumn = i;
			}
		}
		return {
			'index': largestColumn,
			'count': largestColumnCount
		};
	};

	getColumnCount(column) {
		let count = 0;
		for (let i = 0; i < this.piles.length; i++) {
			count += this.piles[i][column].cards.length;
		}
		return count;
	}

	readyToDrink() {
		this.getReadyToDrink = false;
		let currentPlayerIndex = this.players.indexOf(this.currentPlayer);

		let nextPlayerIndex;
		if (currentPlayerIndex === this.players.length - 1) {
			nextPlayerIndex = 0;
		} else {
			nextPlayerIndex = currentPlayerIndex + 1;
		}

		this.countdownPlayer = this.players[nextPlayerIndex].name;
	}

	countdown() {
		this.drinkCount--;
		this.currentPlayer.numDrinks++;

		if (this.drinkCount === 0) {
			this.countdownPlayer = null;
			this.drinkCount = -1;
			this.choiceMessage = '';
			return;
		}

		let countdownPlayerObj = this.players.find(p => p.name === this.countdownPlayer);
		let countdownPlayerIndex = this.players.indexOf(countdownPlayerObj);

		// Skip to next player
		countdownPlayerIndex++;
		// Check that we aren't beyond the array length
		if (countdownPlayerIndex === this.players.length) {
			countdownPlayerIndex = 0;
		}
		// Increase index so current player doesn't click
		if (countdownPlayerIndex === this.players.indexOf(this.currentPlayer)) {
			countdownPlayerIndex++;
			// Check again that we aren't beyond the array length
			if (countdownPlayerIndex === this.players.length) {
				countdownPlayerIndex = 0;
			}
		}

		this.countdownPlayer = this.players[countdownPlayerIndex].name;
	}
}

module.exports = DeathBoxGame;
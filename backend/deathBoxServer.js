const DeathBoxGame = require('./deathBoxGame.js');

class DeathBoxServer {
	constructor() {
		this.games = [];
	}

	createGame(roomId, player) {
		let game = new DeathBoxGame(roomId, player);
		this.games.push(game);
		return game;
	}

	joinGame(roomId, player) {
		let game = this.findGame(roomId);

		if (game != undefined) {
			game.addPlayer(player);
			return game;
		} else {
			return 'noGame';
		}
	}

	leaveGame(roomId, name) {
		let game = this.findGame(roomId);

		if (game != undefined) {
			let player = game.players.find(p => p.name === name);
			game.players.splice(game.players.indexOf(player), 1);

			if (game.players.length === 0) {
				this.games.splice(this.games.indexOf(game), 1);
			}
		}
		return game;
	};

	updateChoice(roomId, choice) {
		let game = this.findGame(roomId);
		game.updateChoice(choice);
		return game;
	}

	pileClicked(roomId, row, column) {
		let game = this.findGame(roomId);
		game.pileClicked(row, column);
		return game;
	}

	findGame(roomId) {
		return this.games.find(g => g.roomId === roomId);
	}
}

module.exports = DeathBoxServer;
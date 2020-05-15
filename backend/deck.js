class Deck {
	constructor(suits = ['spade', 'club', 'heart', 'diamond'], numbers = ['A', '2', '3', '4', '5']/*, '6', '7', '8', '9', '10', 'J', 'Q', 'K']*/) {
		this.cards = this.generateCards(suits, numbers);
	}

	generateCards(suits, numbers) {
		let cards = [];
		for (let i = 0; i < suits.length; i++) {
			for (let j = 0; j < numbers.length; j++) {
				cards.push({
					'suit': suits[i],
					'number': numbers[j]
				});
			}
		}
		return cards;
	}

	shuffle() {
		let shuffledCards = [];
		let cards = this.cards.slice();
		const cardsLength = cards.length;

		let nextCardIndex;
		for (let i = 0; i < cardsLength; i++) {
			nextCardIndex = Math.floor(Math.random() * cards.length);
			shuffledCards.push(cards[nextCardIndex]);
			cards.splice(nextCardIndex, 1);
		}

		this.cards = shuffledCards;
	}

	getNextCards(numCards = 1) {
		if (numCards > 1) {
			return this.cards.slice(0, numCards);
		} else {
			return this.cards.slice(0, 1)[0];
		}
	}

	removeNextCards(numCards = 1) {
		if (numCards > 1) {
			let cards = this.cards.slice(0, numCards);
			this.cards.splice(0, numCards);
			return cards;
		} else {
			let card = this.cards[0];
			this.cards.splice(0, numCards);
			return card;
		}
	}

	addCards(cards) {
		this.cards.unshift(cards);
	}

	static compareCards(card1, card2) {
		let card1Value = this.getCardValue(card1);
		let card2Value = this.getCardValue(card2);

		if (card1Value > card2Value) {
			return 1;
		} else if (card1Value < card2Value) {
			return -1;
		} else {
			return 0;
		}
	}

	static getCardValue(card) {
		let value;
		let number = card.number;
		if (number === 'A') {
			value = 1;
		} else if (number === 'J') {
			value = 11;
		} else if (number === 'Q') {
			value = 12;
		} else if (number === 'K') {
			value = 13;
		} else {
			value = parseInt(number);
		}
		return value;
	}
};

module.exports = Deck;
class Pile {
  constructor() {
    this.cards = [];
  }

  getHeight = () => {
    return this.cards.length;
  }

  addCard = card => {
    this.cards.push(card);
  }

  getTopCard = () => {
    return this.cards[this.cards.length - 1];
  }

  getCards = () => {
    return this.cards;
  }
}

export default Pile;

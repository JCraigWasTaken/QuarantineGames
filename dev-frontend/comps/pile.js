import React from 'react';
import Card from '../comps/card.js';
import CardBack from '../comps/cardBack.js';

class Pile extends React.Component {
  constructor(props) {
    super(props);
  }

  getCard = () => {
    if (this.props.showCard != undefined && this.props.showCard) {
      return(
        <Card
          number={this.props.cards[0].number}
          suit={this.props.cards[0].suit}
          shadow={this.props.shadow}
          id={this.props.id}
          handleCardClick={this.props.handlePileClick}/>
      );
    } else {
      return <CardBack shadow={this.props.shadow} />
    }
  }

  render() {
    return (
      <div>
        {this.getCard()}
      </div>
    )
  }
}

export default Pile;

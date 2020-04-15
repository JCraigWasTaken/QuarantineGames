import React from 'react';
import Card from '../comps/card.js';

class Pile extends React.Component {
  constructor(props) {
    super(props);
  }

  getShadowHeight = () => {
    let boxShadowString = '';
    for (let i = 1; i < this.props.cards.length; i++) {
      let pixelOffset = i;
      boxShadowString += `${pixelOffset}px ${pixelOffset}px 0 0 black`
      if (i !== this.props.cards.length - 1) {
        boxShadowString += ',';
      }
    }
    return boxShadowString;
  }

  render() {
    return (
      <div>
        <Card
          number={this.props.cards[0].number}
          suit={this.props.cards[0].suit}
          shadow={this.getShadowHeight()}/>
      </div>
    )
  }
}

export default Pile;

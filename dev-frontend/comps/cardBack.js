import React from 'react';
import BeerGlass from '../media/beerGlass.png';

class CardBack extends React.Component {
  render() {
    return (
      <div 
        className='card rcorners5 center'
        style={{boxShadow:this.props.shadow}}>
          <img src={BeerGlass} />
       </div>
    )
  }
}


export default CardBack;
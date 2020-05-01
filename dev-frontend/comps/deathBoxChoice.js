import React from 'react';
import Pile from '../comps/pile.js';

class DeathBoxChoice extends React.Component {
  constructor(props) {
    super(props);
  }

  handleChoiceClick = e => {
    this.props.handleChoiceClick(parseInt(e.target.id));
  }

  getPileShadow = () => {
    let boxShadowString = '';
    for (let i = 1; i < this.props.availableCards.length; i++) {
      boxShadowString += `${i}px ${i/10}px 0 0 black`;
      if (i !== this.props.availableCards.length - 1) {
        boxShadowString += ',';
      }
    }
    return boxShadowString;
  }

  render() {
    console.log(this.props.availableCards);
    return(
      <div className='deathBoxButtonChoice'>
        <div>
          <button
            type='button'
            id={1}
            className={'submitButton' + (this.props.drinkCount >= 0 || !this.props.readyToPlay ? 'Disabled' : (this.props.selectedButton === 1 ? 'Selected' : ''))}
            onClick={this.handleChoiceClick}>
              Higher
          </button>
        </div>
        <div>
          <table>
            <tbody>
              <tr>
                <td>
                  <Pile 
                    cards={this.props.availableCards}
                    handlePileClick={e => e.preventDefault()}
                    showCard={this.props.showCard}
                    shadow={this.getPileShadow()}/>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <button
            type='button'
            id={-1}
            className={'submitButton' + (this.props.drinkCount >= 0 || !this.props.readyToPlay ? 'Disabled' : (this.props.selectedButton === -1 ? 'Selected' : ''))}
            onClick={this.handleChoiceClick}>
              Lower
          </button>
        </div>
        {this.props.readyToPlay &&
          <div>
            <div>
              <p>Guesses Remaining: {this.props.remainingToPass}</p>
            </div>
            <div>
              <h2>{this.props.message}</h2>
            </div>
            {this.props.drinkCount >= 0 &&
              <div>
                <div>
                  <h1>{this.props.drinkCount}</h1>
                </div>
                {this.props.getReadyToDrink &&
                  <div>
                    <button
                      type='button'
                      onClick={this.props.handleTimerClick}
                      className='submitButton' >
                        Ready To Drink!
                    </button>
                  </div>
                }
              </div>
            }
          </div>
        }
      </div>
    );
  }
}

export default DeathBoxChoice;

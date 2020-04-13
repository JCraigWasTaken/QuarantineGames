import React from 'react';

class DeathBoxChoice extends React.Component {
  constructor(props) {
    super(props);
  }

  handleChoiceClick = e => {
    this.props.handleChoiceClick(parseInt(e.target.id));
  }

  render() {
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
                  <p>Ready to Drink?</p>
                </div>
                <div>
                  <h1>{this.props.drinkCount}</h1>
                </div>
                {this.props.getReadyToDrink &&
                  <div>
                    <button
                      type='button'
                      onClick={this.props.handleTimerClick}
                      className='submitButton' >
                        Ready!
                    </button>
                  </div>
                }
              </div>
            }
          </div>
        }
        {!this.props.readyToPlay &&
          <div>
            <h2>Please add at least 2 players.</h2>
          </div>
        }
      </div>
    );
  }
}

export default DeathBoxChoice;

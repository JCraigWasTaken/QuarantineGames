const React = require('react');

class DeathBoxChoice extends React.Component {
  constructor(props) {
    super(props);
  }

  handleChoiceClick = e => {
    this.props.handleChoiceClick(e.target.id);
  }

  handlePileClick = () => {
    this.props.handlePileClick(0, 0);
  }

  render() {
    let selectedButton = this.props.selectedButton;
    let message = this.props.message;
    let showNext = this.props.showNext;
    let nextCard = this.props.nextCard;

    return(
      <div className='deathBoxButtonChoice'>
        <div>
          <button
            type="button"
            id='Higher'
            className={'deathBoxButton' + (selectedButton === 'Higher' ? 'selected' : '')}
            onClick={this.handleChoiceClick}>
              Higher
          </button>
        </div>
        <div>
          <button
            type="button"
            id='Lower'
            className={'deathBoxButton' + (selectedButton === 'Lower' ? 'selected' : '')}
            onClick={this.handleChoiceClick}>
              Lower
          </button>
        </div>
        <div>
          <button
            type="button"
            id='Lower'
            className={'deathBoxButton' + (selectedButton === 'Lower' ? 'selected' : '')}
            onClick={this.handlePileClick}>
              Select Pile
          </button>
        </div>
        <div>
          <h3>{message}</h3>
        </div>
      </div>
    );
  }
}

export default DeathBoxChoice;

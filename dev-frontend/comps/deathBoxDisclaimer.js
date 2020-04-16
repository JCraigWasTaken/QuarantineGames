import React from 'react';

class DeathBoxDisclaimer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='small-popup'>
        <div className='popup-content'>
          <div>
            <h2 className='center'>Thanks for playing Death Box!</h2>
          </div>
          <div className='spacing' />
          <div>
            <p className='justified'>
              This is your only warning that you will end up drinking a lot while you play.
              The makers of Death Box aren't going to accept any responsibility for stupid stuff you might say or do while or after playing this game,
              so keep that in mind before you go puke in a friend's bathroom, fall asleep while making a frozen pizza, or crush 30 McNuggets and a large triple-thick milkshake.
              Also, maybe mix in a water at some point. Or don't, I'm not your mom.
            </p>
          </div>
          <div className='center'>
            <button type='button' className='submitButton' onClick={this.props.close}>
              I accept responsibility for all the dumb shit I like to do when I'm drunk!
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default DeathBoxDisclaimer;

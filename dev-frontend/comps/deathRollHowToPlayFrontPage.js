import React from 'react';

class DeathRollHowToPlayFrontPage extends React.Component {
  constructor(props) {
        super(props);
  }

  render() {
    return (
        <div>
            <p className='justified'>
                This game takes place between two teams. The two teams flip a coin to start, and the winning team gets to wager any amount of drinks between 1 and 99. That amount of drinks is multiplied by 10 and set as the maximum roll value (ie. 20 drinks would mean a maximum roll of 200). The game then begins and the team that lost the coin toss makes their first roll. Each roll gives a number from 1 to the value previously rolled, (ie. roll one would be any number from 1-200, so if a 50 is rolled, the next roll would be any number from 1-50). The rolling team alternates between rolls, and the first team to roll a 1 loses and must drink the wagered amount.
            </p>
        </div>
    );
  }
}

export default DeathRollHowToPlayFrontPage;
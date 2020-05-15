import React from 'react';

class MultiplayerDeathBoxCountdown extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className='small-popup'>
				<div className='popup-content'>
					<button
						type='button'
						className='submitButton'
						onClick={ this.props.handleCountdownClick }
					>
						Count Down!
				</button>
				</div>
			</div>
		);
	}
}

export default MultiplayerDeathBoxCountdown;
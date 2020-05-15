import React from 'react';

class HomePage extends React.Component {
	render() {
		return (
			<div className='flex-column flex_center flex_spaceCenter'>
				<h1>Pick a game</h1>
				<a href={ window.location.href + "death-roll" } className='submitButton'>Death Roll</a>
				<a href={ window.location.href + "death-box" } className='submitButton'>Death Box</a>
				<a href={ window.location.href + "multiplayer-death-box" } className='submitButton'>Multiplayer Death Box</a>
				<a href={ window.location.href + "chat" } className='submitButton'>Chat</a>
			</div>
		);
	}
}

export default HomePage;

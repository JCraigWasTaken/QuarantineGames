import React from 'react';
import ChatApi from '../src/api/chatApi.js';

class Chat extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			messages: [],
			newMessage: '',
			user: '',
			setUser: true,
			room: '',
			setupError: ''
		};

		this.chatApi = new ChatApi();
	}

	handleMessageSubmit = e => {
		e.preventDefault();

		if (this.state.user === '' || this.state.newMessage === '') {
			return;
		}

		let message = {
			'user': this.state.user,
			'message': this.state.newMessage
		};

		this.chatApi.writeMessage(message, messages => {
			this.setState({
				newMessage: '',
				messages: messages
			});
		});
	};

	handleNewMessageChange = e => {
		this.setState({
			newMessage: e.target.value
		});
	};

	handleUserNameChange = e => {
		this.setState({
			user: e.target.value
		});
	};

	handleRoomChange = e => {
		this.setState({
			room: e.target.value
		});
	};

	handleJoinRoomClick = () => {
		if (this.state.user.trim() === '') {
			console.log('User is empty');
			this.setState({
				setupError: 'Please enter a username.'
			});
			return;
		}

		this.chatApi.joinRoom(this.state.room, room => {
			if (room !== 'noRoom') {
				this.chatApi.getAllMessages(messages => this.setState({
					setUser: false,
					room: room,
					messages: messages
				}));
			} else {
				const message = `Room ${this.state.room} does not exist.`;
				this.setState({
					setupError: message,
					room: ''
				});
			}
		});
	};

	handleCreateRoomClick = () => {
		if (this.state.user.trim() === '') {
			console.log('User is empty');
			this.setState({
				setupError: 'Please enter a username.'
			});
			return;
		}

		this.chatApi.createRoom(room => {
			this.setState({
				setUser: false,
				room: room
			});
		});
	};

	createMessageContent = () => {
		let messages = this.state.messages;
		if (messages.length === 0) {
			return (
				<p>Say Something!</p>
			);
		} else {
			let messageContent = [];
			for (let i = 0; i < messages.length; i++) {
				messageContent.push(
					<div key={ i }>
						<p>{ messages[i].user }: { messages[i].message }</p>
					</div>
				);
			}
			return messageContent;
		}
	};

	render() {
		return (
			<div>
				{ this.state.setUser &&
					<div className='small-popup'>
						<div className='popup-content'>
							<h2>Welcome to the Chat Room</h2>
							<div>
								<label>User Name:</label>
								<input type='text' value={ this.state.user } onChange={ this.handleUserNameChange } />
							</div>
							<div>
								<input type='text' value={ this.state.room } onChange={ this.handleRoomChange } placeholder='Room Number' />
								<button type='button' onClick={ this.handleJoinRoomClick }>Join Room</button>
							</div>
							<div>
								<button type='button' onClick={ this.handleCreateRoomClick }>Create Room</button>
							</div>
							<div>
								<p>{ this.state.setupError }</p>
							</div>
						</div>
					</div>
				}
				<h1>Chat Room! { this.state.room }</h1>
				<form onSubmit={ this.handleMessageSubmit }>
					<div>
						<label>Message:</label>
						<input type='text' value={ this.state.newMessage } onChange={ this.handleNewMessageChange } />
					</div>
					<div>
						<input type='submit' value='Send Message' />
					</div>
				</form>
				<div>
					{ this.createMessageContent() }
				</div>
			</div>
		);
	}
}

export default Chat;

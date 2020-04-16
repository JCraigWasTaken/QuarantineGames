import React from 'react';
import { writeMessage, newMessage } from '../src/api.js';

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      newMessage: '',
      user: ''
    }
  }

  componentDidMount() {
    newMessage((messages) => this.setState({
      messages: messages
    }));
  }

  handleMessageSubmit = e => {
    e.preventDefault();

    if (this.state.user === '' || this.state.newMessage === '') {
      return;
    }

    let message = {
      'user' : this.state.user,
      'message' : this.state.newMessage
    };

    writeMessage(message);
    this.setState({
      newMessage: ''
    });
  }

  handleNewMessageChange = e => {
    this.setState({
      newMessage: e.target.value
    });
  }

  handleUserNameChange = e => {
    this.setState({
      user: e.target.value
    });
  }

  createMessageContent = () => {
    let messages = this.state.messages;
    if (messages.length === 0) {
      return(
        <p>Say Something!</p>
      )
    } else {
      let messageContent = [];
      for (let i = 0; i < messages.length; i++) {
        messageContent.push(
          <div key={i}>
            <p>{messages[i].user}: {messages[i].message}</p>
          </div>
        )
      }
      return messageContent;
    }
  }

  render() {
    return (
      <div>
        <h1>Chat Room!</h1>
        <form onSubmit={this.handleMessageSubmit}>
          <div>
            <label>User Name:</label>
            <input type='text' value={this.state.user} onChange={this.handleUserNameChange} />
          </div>
          <div>
            <label>Message:</label>
            <input type='text' value={this.state.newMessage} onChange={this.handleNewMessageChange} />
          </div>
          <div>
            <input type='submit' value='Send Message' />
          </div>
        </form>
        <div>
          {this.createMessageContent()}
        </div>
      </div>
    );
  }
}

export default Chat;

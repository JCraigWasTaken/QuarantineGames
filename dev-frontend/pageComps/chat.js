import React from 'react';
import { 
  writeMessage
  , getAllMessages 
} from '../src/api.js';

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      newMessage: '',
      user: '',
      setUser: true
    }
  }

  componentDidMount() {
    getAllMessages(messages => this.setState({
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

    writeMessage(message, messages => {
      this.setState({
        newMessage: '',
        messages: messages
      });
    });
  }

  handleNewMessageChange = e => {
    this.setState({
      newMessage: e.target.value
    });
  }

  handleUserNameChange = e => {
    this.setState({
      user: e.target.value,
    });
  }

  handleSetUserNameSubmit = e => {
    e.preventDefault();
    this.setState({
      setUser: false
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
        {this.state.setUser && 
          <div className='small-popup'>
            <div className='popup-content'>
              <form onSubmit={this.handleSetUserNameSubmit}>
                <h2>Set your user name.</h2>
                <input type='text' value={this.state.user} onChange={this.handleUserNameChange}/>
                <input type='submit' value='Set User Name' />
              </form>
            </div>
          </div>
        }
        <h1>Chat Room!</h1>
        <form onSubmit={this.handleMessageSubmit}>
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

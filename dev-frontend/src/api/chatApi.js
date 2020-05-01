// Imports
import Api from './api.js';

const chatNamespace = 'chat';

class ChatApi extends Api {
	constructor() {
		super(chatNamespace);
	}

	writeMessage(message, cb) {
		this.socket.emit('writeMessage', message);
		this.socket.on('writeMessage', messages => cb(messages));
	}

	getAllMessages(cb) {
		this.socket.emit('getAllMessages');
		this.socket.on('getAllMessages', messages => cb(messages));
	}
}

export default ChatApi;

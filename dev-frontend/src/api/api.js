// Imports
const openSocket = require('socket.io-client');

// Set port
const port = process.env.PORT || 5000;

class Api {
	constructor(namespace = '') {
		if (process.env.NODE_ENV === 'production') {
			console.log('production');
			this.socket = openSocket(namespace);
			console.log(this.socket);
		} else {
			this.socket = openSocket(`http://localhost:${port}${namespace}`);
		}
	}

	createRoom(cb) {
		this.socket.emit('createRoom');
		this.socket.on('joinRoom', roomId => cb(roomId));
	}

	joinRoom(room, cb) {
		this.socket.emit('joinRoom', room);
		this.socket.on('joinRoom', roomId => cb(roomId));
	}
}

export default Api;
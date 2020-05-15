// Imports
const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const ChatServer = require('./chatServer.js');
const DeathBoxServer = require('./deathBoxServer.js');

// Create router
const router = express();
// Create server
const server = http.Server(router);
// Create socketIO
const io = socketIO(server);
// Set port
const port = process.env.PORT || 5000;

// Set namespaces
const deathBoxNamespace = '/deathbox';
const chatNamespace = '/chat';

// Create servers
let deathBoxServer = new DeathBoxServer();
let chatServer = new ChatServer();

// Start listening
server.listen(port, () => {
	console.log(`Listening on port ${port}.`);
});

// In production, send bundled index.html
if (process.env.NODE_ENV === 'production') {
	router.use(express.static(path.resolve(__dirname, '../prod-frontend')));

	router.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, '../prod-frontend', 'index.html'));
	});
}

// Chat Room
io.of(chatNamespace).on('connection', socket => {

	socket.on('joinRoom', roomId => {
		let defined = chatServer.checkRooms(roomId);

		if (defined != undefined) {
			socket.roomId = roomId;
			socket.join(roomId);
			chatServer.joinRoom(roomId, socket.id);
			socket.emit('joinRoom', roomId);

		} else {
			socket.emit('joinRoom', 'noRoom');
		}
	});

	socket.on('createRoom', () => {
		let roomId = generateRoomId();

		socket.roomId = roomId;
		socket.join(roomId);
		chatServer.addRoom(roomId, socket.id);

		socket.emit('joinRoom', roomId);
	});

	socket.on('getAllMessages', () => {
		socket.emit('getAllMessages', chatServer.getAllMessages(socket.roomId));
	});

	socket.on('writeMessage', message => {
		io.of(chatNamespace).to(socket.roomId).emit('writeMessage', chatServer.writeMessage(socket.roomId, message));
	});

	socket.on('disconnect', () => {
		socket.leave(socket.roomId);
		chatServer.leaveRoom(socket.roomId, socket.id);
		socket.roomId = undefined;
	});
});

// Deathbox
io.of(deathBoxNamespace).on('connection', socket => {
	socket.on('createRoom', player => {
		let roomId = generateRoomId();

		socket.roomId = roomId;
		socket.player = player;
		socket.join(roomId);

		let game = deathBoxServer.createGame(roomId, player);

		socket.emit('createRoom', game);
	});

	socket.on('joinRoom', (roomId, player) => {
		let game = deathBoxServer.joinGame(roomId, player);

		if (game != 'noGame') {
			socket.roomId = roomId;
			socket.player = player;
			socket.join(roomId);

			io.of(deathBoxNamespace).to(socket.roomId).emit('joinRoom', game);

		} else {
			socket.emit('joinRoom', game);
		}
	});

	socket.on('updateChoice', choice => {
		let game = deathBoxServer.updateChoice(socket.roomId, choice);
		io.of(deathBoxNamespace).to(socket.roomId).emit('updateChoice', game);
	});

	socket.on('pileClicked', (row, column) => {
		let game = deathBoxServer.pileClicked(socket.roomId, row, column);
		io.of(deathBoxNamespace).to(socket.roomId).emit('pileClicked', game);

		setTimeout(() => {
			game = deathBoxServer.updatePiles(socket.roomId);
			io.of(deathBoxNamespace).to(socket.roomId).emit('updatePiles', game);
		}, 1000);
	});

	socket.on('readyToDrink', () => {
		let game = deathBoxServer.readyToDrink(socket.roomId);
		io.of(deathBoxNamespace).to(socket.roomId).emit('countdown', game);
	});

	socket.on('countdown', () => {
		let game = deathBoxServer.countdown(socket.roomId);
		io.of(deathBoxNamespace).to(socket.roomId).emit('countdown', game);
	});

	socket.on('disconnect', () => {
		console.log('Disconnecting');
		let game = deathBoxServer.leaveGame(socket.roomId, socket.player);
		io.of(deathBoxNamespace).to(socket.roomId).emit('removePlayer', game);
		socket.leave(socket.roomId);
		socket.roomId = undefined;
		socket.player = undefined;
	});
});

const generateRoomId = () => {
	return Math.floor(Math.random() * 10000).toString().padStart(4, '0');
};
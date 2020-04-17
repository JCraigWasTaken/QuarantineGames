const openSocket = require('socket.io-client');
const port = process.env.PORT || 5000;
const socket = openSocket(`http://localhost:${port}`);

function writeMessage(message) {
  socket.emit('writeMessage', message);
}

function newMessage(cb) {
  socket.on('writeMessage', messages => cb(messages));
}

export { writeMessage, newMessage };

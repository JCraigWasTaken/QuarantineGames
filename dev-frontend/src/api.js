import openSocket from 'socket.io-client';
const socket = openSocket('/');

function writeMessage(message) {
  socket.emit('writeMessage', message);
}

function newMessage(cb) {
  socket.on('writeMessage', messages => cb(messages));
}

export { writeMessage, newMessage };

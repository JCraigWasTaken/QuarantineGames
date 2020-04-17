const openSocket = require('socket.io-client');
const port = process.env.PORT || 5000;
let socket;
if (process.env.NODE_ENV === 'production') {
  socket = openSocket();
} else {
  socket = openSocket(`http://localhost:${port}`);
}

function writeMessage(message, cb) {
  socket.emit('writeMessage', message);
  socket.on('writeMessage', messages => cb(messages));
}

// function newMessage(cb) {
//   socket.on('writeMessage', messages => cb(messages));
// }

function getAllMessages(cb) {
  socket.emit('getAllMessages');
  socket.on('getAllMessages', messages => cb(messages));
}

export { 
  writeMessage
  // , newMessage
  , getAllMessages };

const express = require('express');
const path = require('path');
const socketIO = require('socket.io');
const socket = socketIO();

// const router = express();
const port = process.env.PORT || 5000;

if (process.env.NODE_ENV === 'production') {
  console.log('Production');
  socket.use(express.static(path.resolve(__dirname, '../prod-frontend')));

  socket.on('connection', (client) => {
    client.emit(path.resolve(__dirname, '../prod-frontend','index.html'));
  });
}

// const port = 8080;

// let messages = [];
//
// socket.on('connection', (client) => {
//   client.on('writeMessage', message => {
//     messages.unshift(message);
//     socket.emit('writeMessage', messages);
//   });
// });

socket.listen(port, () => {
  console.log(`Listening on port ${port}.`);
});

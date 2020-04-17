// Imports
const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');

// Create router
const router = express();
// Create server
const server = http.Server(router);
// Create socketIO
const io = socketIO(server);
// Set port
const port = process.env.PORT || 5000;

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

// Socket connection handling
let messages = [];

io.on('connection', client => {
  client.on('getAllMessages', () => {
    io.emit('getAllMessages', messages);
  });

  client.on('writeMessage', message => {
    messages.unshift(message);

    if (messages.length > 10) {
      messages.splice(30);
    }

    io.emit('writeMessage', messages);
  });

});

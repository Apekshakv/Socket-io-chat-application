const express = require('express');
const app = express();
const http = require('http');
const router = require('./router');
const socketio = require('socket.io');
const cors = require('cors');

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(router);

const { addusers, removeuser, getusers, getusersinroom } = require('./user');

const server = http.createServer(app);


const io = socketio(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  }
});

io.on('connection', (socket) => {
  console.log('We have a new connection');

  socket.on('join', ({ name, room }, callback) => {
    const { error, user } = addusers({ id: socket.id, name, room });

    if (error) return callback(error);

    socket.join(user.room);

    socket.emit('message', {
      user: 'admin',
      text: `${user.name}, welcome to the room ${user.room}`
    });

    socket.broadcast.to(user.room).emit('message', {
      user: 'admin',
      text: `${user.name} has joined the room!`
    });

    callback();
  });

  socket.on('sendMessage', (message, callback) => {
    const user = getusers(socket.id);

    if (user) {
      io.to(user.room).emit('message', { user: user.name, text: message });
    }

    callback();
  });

  socket.on('disconnect', () => {
    const user = removeuser(socket.id);

    if (user) {
      io.to(user.room).emit('message', {
        user: 'admin',
        text: `${user.name} has left.`
      });
    }

    console.log('User Disconnected');
  });
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

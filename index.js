const express = require("express");
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');


const app = express();
const server = createServer(app);

const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000"
    }
  });

app.get('/', (req, res) => res.send("Hello World")); 

io.on('connection', (socket) => {
    console.log('A user connected');
});

server.listen(9876, () => {
    console.log('Listening on port 9876');
})

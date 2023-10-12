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
    const id = socket.id;
    socket.emit("id", id);
    console.log(`User connected: ${id}`);
    socket.on("message", (data) => {
        console.log(`Get data from client: ${id}: ${data.message}`)
        socket.broadcast.emit("test", {message: data.message, user: id})
    })
});


io.on('disconnect', (socket) => {
    console.log("User disconnect from server");
    io.emit("disconnect!");
    socket.broadcast.emit("hello", "world"); 
})

server.listen(9876, () => {
    console.log('Listening on port 9876');
})

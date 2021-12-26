const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const path = require('path')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 3001
const publicPath = path.join(__dirname, '../public')
app.use(express.static(publicPath))

let count = 0
io.on('connection', (socket) => {
  console.log('new websocket connection')
  socket.emit('countUpdated', count)
  socket.on('increment', () => {
    count++
    io.emit('countUpdated', count)
  })
  socket.broadcast.emit('chat-event', 'A new user has joined');

  socket.on('sendMessage', (message, username) => {
    io.emit('receiveMessage', message, username)
  })

  socket.on('disconnect', () => {
    io.emit('chat-event', 'A user has left')
  })
})
server.listen(port, ()=> {
  console.log('server running')
})
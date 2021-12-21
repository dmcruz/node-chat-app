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

io.on('connection', () => {
  console.log('new websocket connection')
})
server.listen(port, ()=> {
  console.log('server running')
})
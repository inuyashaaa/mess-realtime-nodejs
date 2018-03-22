'use strict'

const app = require('./app')

const server = app.listen(8080)

const io = require('socket.io').listen(server)

io.on('connection', function (socket) {
  // console.log(`User ${socket.conn.id} is connected! IP: ${socket.request.connection.remoteAddress}`)
  socket.on('chat:message', function (data) {
    io.emit('chat:message', data)
  })
})

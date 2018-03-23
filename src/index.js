'use strict'

const app = require('./app')
const port = process.env.PORT || '6969'
const server = app.listen(port)

const io = require('socket.io').listen(server)

io.on('connection', function (socket) {
  // console.log(`User ${socket.conn.id} is connected! IP: ${socket.request.connection.remoteAddress}`)
  socket.on('chat:message', function (data) {
    io.emit('chat:message', data)
  })
})

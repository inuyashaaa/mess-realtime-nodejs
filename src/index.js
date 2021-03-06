'use strict'

const app = require('./app')
const port = process.env.PORT || '8080'
const server = app.listen(port, '172.31.31.235')

const io = require('socket.io').listen(server)

io.on('connection', function (socket) {
  // console.log(`User ${socket.conn.id} is connected! IP: ${socket.request.connection.remoteAddress}`)
  socket.on('chat:message', function (data) {
    io.emit('chat:message', data)
  })
})

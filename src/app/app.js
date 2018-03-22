var app = require('http').createServer(handler)
var io = require('socket.io')(app)
var fs = require('fs')

app.listen(8080)

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
    function (err, data) {
      if (err) {
        res.writeHead(500)
        return res.end('Error loading index.html')
      }

      res.writeHead(200)
      res.end(data)
    })
}

io.on('connection', function (socket) {
  console.log(`User ${socket.conn.id} is connected! IP: ${socket.request.connection.remoteAddress}`)

  socket.on('chat:message', function (data) {
    io.emit('chat:message', data)
  })
})

var express = require('express')
  , app     = express()
  , server  = require('http').createServer(app)
  , port    = process.argv[2] || 8888
  , yml     = require('js-yaml')

var BinaryServer = require('binaryjs').BinaryServer
  , binaryServer = BinaryServer({ server : server
                                , path   : '/stream' })

server.listen(port)

app.use(express.static(__dirname + '/client'))

app.get('/', function (req,res){
  console.log('client')
  res.sendfile('client/index.html')
})

binaryServer.on('connection', function (client) {
  console.log('binary connection established')

  client.on('stream', function (stream) {
    stream.on('data', function (data) {
      console.log(data)
    })
  })
})

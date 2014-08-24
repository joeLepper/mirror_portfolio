var express  = require('express')
  , app      = express()
  , server   = require('http').createServer(app)
  , port     = process.argv[2] || 8888
  , yml      = require('js-yaml')
  , io       = require('socket.io').listen(server)
  , mail     = require('./mailer')

server.listen(port)

app.use(express.static(__dirname + '/app'))
app.use(express.bodyParser())

app.get('/', function (req,res){
  console.log('index')
  res.sendfile('app/index.html')
})

app.get('/mirror', function (req, res) {
  console.log('mirror')
  res.sendfile('app/mirror.html')
})

app.get('/gif_mirror', function (req, res) {
  console.log('gif_mirror')
  res.sendfile('app/gif_mirror.html')
})

app.get('/control_mirror', function (req, res) {
  console.log('gif_mirror')
  res.sendfile('app/control_mirror.html')
})

app.post('/pixel', function (req, res) {
  console.log('pixel')
  io.sockets.emit('pixel', req.body)
})

app.post('/email', function (req, res) {
  console.log(req.body.link)
  mail(req.body.email, req.body.link)
  res.send(200)
})

io.set('log level', 0)

io.sockets.on('connection', function (socket) {
  console.log('SOCKET: client connected')
})

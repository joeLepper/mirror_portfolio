var express    = require('express')
  , app        = express()
  , server     = require('http').createServer(app)
  , port       = process.argv[2] || 8888

server.listen(port)

app.use(express.static(__dirname + '/app'))

app.get('/', function (req,res){
  console.log('index')
  res.sendfile('app/index.html')
})

app.get('/mirror', function (req, res) {
  console.log('mirror')
  res.sendfile('app/mirror.html')
})

var express    = require('express')
  , app        = express()
  , server     = require('http').createServer(app)
  , port       = process.argv[2] || 8888;

server.listen(port);

app.use(express.static(__dirname + '/app'));

app.get('/app', function(req,res){
  console.log('Service!');
  res.sendfile('app/index.html')
});


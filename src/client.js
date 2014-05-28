var animatedMirror = require('./animated_mirror')
  , video          = document.querySelector('#mirror')
  , buffer         = document.querySelector('#frame-buffer')
  , output         = document.querySelector('#output')

var mirror = animatedMirror(video, buffer, output)

mirror.on('connect', function () {
  var client = new BinaryClient('ws://localhost:8888/stream')
  client.on('open', function () {
    var stream = client.createStream()
    mirror.on('data', function (points) {
      for (var i = 0; i < points.length; i++) {
        if (i === 0) { console.log(points[i]); console.log(points.length) }
        stream.write(new Uint16Array(points[i]))
      }
    })
  })
})

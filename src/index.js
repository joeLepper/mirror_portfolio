var output = document.querySelector('#output')
  , oCtx   = output.getContext('2d')

socket = io.connect('http://localhost:8080')

socket.on('pixel', function (p) {
  oCtx.lineJoin = oCtx.lineCap = 'round'
  oCtx.fillStyle = 'rgba(' + p.r + ',' + p.g + ',' + p.b + ',' + p.a + ');'
  oCtx.beginPath()
  oCtx.globalAlpha = p.o
  oCtx.arc(p.x, p.y, p.ra, false, Math.PI * 2, false)
  oCtx.fill()
})

var colorShift   = require('./color_shift')
  , getRandomInt = require('./random_int')
  , coinFlip     = require('./coin_flip')
  , colors       = require('./colors')

module.exports = function applyStroke (oCtx, bCtx, bCan, evt) {
  var points = new ArrayBuffer(64)

  for (var i = 0; i < 5000; i++) {
    dot(oCtx, bCtx, bCan, points, i)
  }
  evt.emit('data', points)
}

function dot (oCtx, bCtx, bCan, points, i) {
  var alpha  = getRandomInt(0,10) / 11
    , x = Math.floor(Math.random() * bCan.width)
    , y = Math.floor(Math.random() * bCan.height)
    , imgData = bCtx.getImageData(x, y, 1, 1)
    , radius = coinFlip() ? getRandomInt(1, 2) : getRandomInt(1, 3)
    , r = colorShift(imgData.data[0], [0, colors.get(0)])
    , g = colorShift(imgData.data[1], [0, colors.get(1)])
    , b = colorShift(imgData.data[2], [0, colors.get(2)])


  oCtx.lineJoin = oCtx.lineCap = 'round'
  oCtx.fillStyle = 'rgba(' + r + ',' + g + ',' + b + ',' + alpha + ');'
  oCtx.beginPath()
  oCtx.globalAlpha = alpha
  oCtx.arc(x, y, radius, false, Math.PI * 2, false)
  oCtx.fill()
  points[i] = [x, y, r, g, b]
}

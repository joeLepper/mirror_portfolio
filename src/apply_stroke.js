var colorShift   = require('./color_shift')
  , getRandomInt = require('./random_int')
  , coinFlip     = require('./coin_flip')

module.exports = function applyStroke (oCtx, bCtx, bCan) {

  var imgData     = bCtx.getImageData(x, y, 1, 1)
    , points      = []
    , x           = Math.floor(Math.random() * bCan.width)
    , y           = Math.floor(Math.random() * bCan.height)
    , r           = colorShift(imgData.data[0])
    , g           = imgData.data[1]
    , b           = colorShift(imgData.data[2])
    , a           = getRandomInt(0,10) / 11
    , colorString = 'rgba(' + r + ',' + g + ',' + b + ',' + a + ');'

  coinFlip() ? drawLittleDot() : drawBigDot()
  oCtx.lineJoin = oCtx.lineCap = 'round'
  oCtx.fillStyle = colorString

  for (var i = 0; i < points.length; i++) {
    oCtx.beginPath()
    oCtx.globalAlpha = points[i].opacity
    oCtx.arc(
      points[i].x, points[i].y, points[i].radius,
      false, Math.PI * 2, false)
    oCtx.fill()
  }

  function drawBigDot () {
    points.push({
      x: x,
      y: y,
      radius: getRandomInt(1, 2),
      opacity: Math.random()
    })
  }

  function drawLittleDot () {
    points.push({
      x: x,
      y: y,
      radius: getRandomInt(1, 3),
      opacity: Math.random()
    })
  }
}
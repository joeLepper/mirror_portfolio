var colorShift   = require('./color_shift')
  , getRandomInt = require('./random_int')
  , coinFlip     = require('./coin_flip')
  , colors       = require('./colors')

module.exports = function applyStroke (oCtx, bCtx, bCan, evt) {
  var points = []

  for (var i = 0; i < 5000; i++) {
    dot(oCtx, bCtx, bCan, points, evt)
  }
  evt.emit('data', points)
}

function dot (oCtx, bCtx, bCan, points, evt) {
  var alpha  = getRandomInt(0,10) / 11
    , config = { x : Math.floor(Math.random() * bCan.width)
               , y : Math.floor(Math.random() * bCan.height)
               , a : alpha.toFixed(2) }

  var imgData = bCtx.getImageData(config.x, config.y, 1, 1)

  config.r = colorShift(imgData.data[0], [0, colors.get(0)])
  config.g = colorShift(imgData.data[1], [0, colors.get(1)])
  config.b = colorShift(imgData.data[2], [0, colors.get(2)])

  var p = coinFlip() ? drawLittleDot(config) : drawBigDot(config)

  oCtx.lineJoin = oCtx.lineCap = 'round'
  oCtx.fillStyle = 'rgba(' + p.r + ',' + p.g + ',' + p.b + ',' + p.a + ');'
  oCtx.beginPath()
  oCtx.globalAlpha = p.a
  oCtx.arc(p.x, p.y, p.ra, false, Math.PI * 2, false)
  oCtx.fill()
  points.push([p.x, p.y, p.ra, p.r, p.g, p.b, p.a])
}

function drawBigDot (config) {
  return { x  : config.x
         , y  : config.y
         , ra : getRandomInt(1, 2)
         , r  : config.r
         , g  : config.g
         , b  : config.b
         , a  : config.a }
}

function drawLittleDot (config) {
  return { x  : config.x
         , y  : config.y
         , ra : getRandomInt(1, 3)
         , r  : config.r
         , g  : config.g
         , b  : config.b
         , a  : config.a }
}
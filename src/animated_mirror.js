var applyStroke   = require('./apply_stroke')
  , colorShift    = require('./color_shift')
  , getRandomInt  = require('./random_int')
  , eventEmitter  = require('events').EventEmitter
  , util          = require('util')
  , bufferContext
  , outputContext

module.exports = function mirror (video, buffer, output) {
  function initMirror () {
    var self = this
    navigator.webkitGetUserMedia({ video : true }, function(_stream) {
      bufferContext = buffer.getContext('2d')
      outputContext = output.getContext('2d')
      console.log(initMirror)
      self.emit('connect')
      video.setAttribute('src', window.URL.createObjectURL(_stream))
      shutter()
      requestAnimationFrame(brush)
    })

    function shutter () {
      setTimeout(function () {
        closeShutter(video, buffer, bufferContext)
        shutter()
      }, getRandomInt(100, 1000))
    }

    function brush () {
      for (var i = 0; i < 5000; i ++) {
        applyStroke(outputContext, bufferContext, buffer)
      }
      requestAnimationFrame(brush)
    }
  }
  util.inherits(initMirror, eventEmitter)
  return new initMirror()
}

function closeShutter (vid, buf, ctx) {
  ctx.drawImage( vid
               , 0
               , 0
               , vid.videoWidth
               , vid.videoHeight
               , 0
               , 0
               , buf.width
               , buf.height
               )
}
